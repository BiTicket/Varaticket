#![no_std]

use events_io::*;
use gstd::{
    collections::{BTreeMap, HashSet},
    msg,
    prelude::*,
    ActorId,
};
use multi_token_io::{BalanceReply, MtkAction, MtkEvent, TokenId, TokenMetadata};

const ZERO_ID: ActorId = ActorId::zero();
const NFT_COUNT: u128 = 1;

#[derive(Debug, Default)]
struct EventInfo {
    name: String,
    description: String,
    creator: ActorId,
    number_of_tickets: u128,
    tickets_left: u128,
    date: u128,
    buyers: HashSet<ActorId>,
    running: bool,
    metadata: BTreeMap<ActorId, BTreeMap<u128, Option<TokenMetadata>>>,
    token_id: u128,
    id_counter: u128,
    event_id: u128,
    ticket_ft_id: u128,
}

#[derive(Debug, Default)]
struct Event {
    owner_id: ActorId,
    contract_id: ActorId,
    events_info: BTreeMap<ActorId, BTreeMap<u128, EventInfo>>,
}

static mut CONTRACT: Option<Event> = None;

#[no_mangle]
unsafe extern "C" fn init() {
    let config: InitEvent = msg::load().expect("Unable to decode InitConfig");
    let event = Event {
        owner_id: config.owner_id,
        contract_id: config.mtk_contract,
        ..Default::default()
    };
    CONTRACT = Some(event);
}

#[gstd::async_main]
async unsafe fn main() {
    let action: EventAction = msg::load().expect("Could not load Action");
    let event: &mut Event = unsafe { CONTRACT.get_or_insert(Default::default()) };
    let reply = match action {
        EventAction::Create {
            creator,
            name,
            description,
            number_of_tickets,
            date,
        } => event.create_event(name, description, creator, number_of_tickets, date),
        EventAction::Hold { creator, event_id } => event.hold_event(creator, event_id).await,
        EventAction::BuyTickets {
            creator,
            event_id,
            amount,
            metadata,
        } => event.buy_tickets(creator, event_id, amount, metadata).await,
    };

    msg::reply(reply, 0)
        .expect("Failed to encode or reply with `Result<EventsEvent, EventError>`.");
}

impl Event {
    fn create_event(
        &mut self,
        name: String,
        description: String,
        creator: ActorId,
        number_of_tickets: u128,
        date: u128,
    ) -> Result<EventsEvent, EventError> {
        /* if self.running {
            return Err(EventError::AlreadyRegistered);
        } */

        let mut actor_ev_id = 0 as u128;
        let mut ev_info = EventInfo {
            creator,
            name,
            description,
            number_of_tickets,
            date,
            running: true,
            tickets_left: number_of_tickets,
            ..Default::default()
        };

        if !self.events_info.contains_key(&creator) {
            let mut new_actor: BTreeMap<u128, EventInfo> = BTreeMap::new();
            ev_info.token_id += 1;
            ev_info.id_counter = actor_ev_id;
            ev_info.event_id = ev_info.id_counter;
            ev_info.ticket_ft_id = ev_info.event_id;

            new_actor.insert(actor_ev_id, ev_info);

            self.events_info.insert(creator, new_actor);
        } else {
            let e = self.events_info.get_mut(&creator).unwrap();

            actor_ev_id = e.keys().into_iter().max().unwrap() + 1;
            ev_info.token_id = e[&(actor_ev_id - 1)].token_id + 1;
            ev_info.id_counter = actor_ev_id;
            ev_info.event_id = ev_info.id_counter;
            ev_info.ticket_ft_id = ev_info.event_id;

            e.insert(actor_ev_id, ev_info);
        }

        Ok(EventsEvent::Creation {
            creator,
            event_id: actor_ev_id,
            number_of_tickets,
            date,
        })
    }

    async fn buy_tickets(
        &mut self,
        creator: ActorId,
        event_id: u128,
        amount: u128,
        mtd: Vec<Option<TokenMetadata>>,
    ) -> Result<EventsEvent, EventError> {
        if msg::source() == ZERO_ID {
            return Err(EventError::ZeroAddress);
        }

        if amount < 1 {
            return Err(EventError::LessThanOneTicket);
        }

        if mtd.len() != amount as usize {
            return Err(EventError::NotEnoughMetadata);
        }

        let event = self
            .events_info
            .get_mut(&creator)
            .ok_or(EventError::EventNotFound)?;

        let ev_info = event
            .get_mut(&event_id)
            .ok_or(EventError::EventIdNotFound)?;

        if ev_info.tickets_left < amount {
            return Err(EventError::NotEnoughTickets);
        }

        for meta in mtd {
            ev_info.id_counter += 1;
            ev_info
                .metadata
                .entry(msg::source())
                .or_default()
                .insert(ev_info.id_counter + 1, meta);
        }

        ev_info.buyers.insert(msg::source());
        ev_info.tickets_left -= amount;
        match msg::send_for_reply_as::<_, MtkEvent>(
            self.contract_id,
            MtkAction::Mint {
                id: ev_info.token_id,
                amount,
                token_metadata: None,
            },
            0,
            0,
        ) {
            Ok(_) => (),
            Err(e) => {
                return Err(EventError::BuyMintError(e.to_string()));
            }
        }

        Ok(EventsEvent::Purchase {
            creator,
            event_id: ev_info.event_id,
            amount,
        })
    }

    // MINT SEVERAL FOR A USER
    async fn hold_event(
        &mut self,
        creator: ActorId,
        event_id: u128,
    ) -> Result<EventsEvent, EventError> {
        let event = self
            .events_info
            .get_mut(&creator)
            .ok_or(EventError::EventNotFound)?;

        let ev_info = event
            .get_mut(&event_id)
            .ok_or(EventError::EventIdNotFound)?;

        if msg::source() != ev_info.creator {
            return Err(EventError::NotCreator);
        }

        // get balances from a contract
        let accounts: Vec<ActorId> = ev_info.buyers.clone().into_iter().collect();
        let tokens: Vec<TokenId> = iter::repeat(ev_info.ticket_ft_id)
            .take(accounts.len())
            .collect();

        let balance_response: MtkEvent = msg::send_for_reply_as(
            self.contract_id,
            MtkAction::BalanceOfBatch {
                accounts,
                ids: tokens,
            },
            0,
            0,
        )
        .expect("Error in async message to Mtk contract")
        .await
        .expect("EVENT: Error getting balances from the contract");

        let balances: Vec<BalanceReply> =
            if let MtkEvent::BalanceOf(balance_response) = balance_response {
                balance_response
            } else {
                Vec::new()
            };

        // we know each user balance now
        for balance in &balances {
            match msg::send_for_reply_as::<_, MtkEvent>(
                self.contract_id,
                MtkAction::Burn {
                    id: balance.id,
                    amount: balance.amount,
                },
                0,
                0,
            ) {
                Ok(_) => (),
                Err(e) => {
                    return Err(EventError::HoldBurnError(e.to_string()));
                }
            }
        }

        for actor in &ev_info.buyers {
            let actor_metadata = ev_info.metadata.get(actor);
            if let Some(actor_md) = actor_metadata.cloned() {
                let mut ids = Vec::with_capacity(actor_md.len());
                let amounts = vec![NFT_COUNT; actor_md.len()];
                let mut meta = vec![];
                for (token, token_meta) in actor_md {
                    ids.push(token);
                    meta.push(token_meta);
                }

                match msg::send_for_reply_as::<_, MtkEvent>(
                    self.contract_id,
                    MtkAction::MintBatch {
                        ids,
                        amounts,
                        tokens_metadata: meta,
                    },
                    0,
                    0,
                ) {
                    Ok(_) => (),
                    Err(e) => {
                        return Err(EventError::HoldMintError(e.to_string()));
                    }
                }
            }
        }
        ev_info.running = false;

        Ok(EventsEvent::Hold {
            creator,
            event_id: ev_info.event_id,
        })
    }
}

#[no_mangle]
extern "C" fn state() {
    let contract = unsafe { CONTRACT.take().expect("Unexpected error in taking state") };
    msg::reply::<State>(contract.into(), 0)
        .expect("Failed to encode or reply with `State` from `state()`");
}

impl From<Event> for State {
    fn from(value: Event) -> Self {
        let Event {
            owner_id,
            contract_id,
            events_info,
        } = value;

        let mut all_ev_info: Vec<(ActorId, EventStateInfo)> = Vec::new();

        for (k, v) in events_info.iter() {
            let mut ev_state_info: Vec<(u128, StateInfo)> = Vec::new();
            for (k1, v1) in v.iter() {
                let EventInfo {
                    name,
                    description,
                    date,
                    number_of_tickets,
                    tickets_left,
                    creator,
                    buyers,
                    running,
                    metadata,
                    token_id,
                    id_counter,
                    event_id,
                    ticket_ft_id,
                } = v1;

                let meta_data: Vec<(ActorId, Tickets)> = metadata
                    .into_iter()
                    .map(|(k, v)| (k.clone(), v.clone().into_iter().collect()))
                    .collect();

                let info = StateInfo {
                    name: name.clone(),
                    description: description.clone(),
                    creator: *creator,
                    number_of_tickets: *number_of_tickets,
                    tickets_left: *tickets_left,
                    date: *date,
                    buyers: buyers.clone().into_iter().collect(),
                    running: *running,
                    metadata: meta_data,
                    token_id: *token_id,
                    id_counter: *id_counter,
                    event_id: *event_id,
                    ticket_ft_id: *ticket_ft_id,
                };
                ev_state_info.push((*k1, info));
            }
            all_ev_info.push((*k, ev_state_info));
        }

        let state = State {
            owner_id,
            contract_id,
            ev_state_info: all_ev_info,
        };

        state
    }
}
