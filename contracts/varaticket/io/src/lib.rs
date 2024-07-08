#![no_std]

use gmeta::{In, InOut, Metadata, Out};
use gstd::{prelude::*, ActorId};
use multi_token_io::TokenMetadata;

pub struct ContractMetadata;

impl Metadata for ContractMetadata {
    type Init = In<InitEvent>;
    type Handle = InOut<EventAction, Result<EventsEvent, EventError>>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = Out<State>;
}

#[derive(Debug, Default, PartialEq, Eq, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct StateInfo {
    pub name: String,
    pub description: String,
    pub creator: ActorId,
    pub number_of_tickets: u128,
    pub tickets_left: u128,
    pub date: u128,
    pub buyers: Vec<ActorId>,
    pub running: bool,
    pub metadata: Vec<(ActorId, Tickets)>,
    /// user to token id to metadata
    pub token_id: u128,
    pub id_counter: u128,
    pub event_id: u128,
    pub ticket_ft_id: u128,
}
#[derive(Debug, Default, PartialEq, Eq, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct State {
    pub owner_id: ActorId,
    pub contract_id: ActorId,
    pub ev_state_info: Vec<(ActorId, EventStateInfo)>,

}

pub type EventStateInfo = Vec<(u128, StateInfo)>;
pub type Tickets = Vec<(u128, Option<TokenMetadata>)>;

#[doc(hidden)]
impl State {
    pub fn current_event(self, creator: ActorId, event_id: u128) -> CurrentEvent {

        let current = self.ev_state_info
            .into_iter()
            .find_map(|(some_creator, events)| {
                (some_creator == creator)
                    .then_some(events.into_iter().find(|(id, _)| *id == event_id))
            })
            .unwrap_or_default();

        match current {
            Some((_, info)) => {
                let tickets_left = info.tickets_left;
                let number_of_tickets = info.number_of_tickets;
                CurrentEvent {
                    name: info.name,
                    description: info.description,
                    date: info.date,
                    number_of_tickets,
                    tickets_left,
                }
            }
            None => CurrentEvent::default(),

        }
    }

    pub fn current_event_buyers(self, creator: ActorId, event_id: u128) -> Vec<ActorId> {
        self.ev_state_info
            .into_iter()
            .find_map(|(some_creator, events)| {
                (some_creator == creator)
                    .then_some(events.into_iter().find(|(id, _)| *id == event_id))
            })
            .unwrap_or_default()
            .map(|(_, info)| info.buyers)
            .unwrap_or_default()
    }

    pub fn user_tickets(self, creator: ActorId, event_id: u128, user: ActorId) -> Vec<Option<TokenMetadata>> {

        self.ev_state_info
            .into_iter()
            .find_map(|(some_creator, events)| {
                (some_creator == creator)
                    .then_some(events.into_iter().find(|(id, _)| *id == event_id))
            })
            .unwrap_or_default()
            .map(|(_, info)| info.metadata)
            .unwrap_or_default()
            .into_iter()
            .find_map(|(some_user, tickets)| {
                (some_user == user)
                    .then_some(tickets.into_iter().map(|(_, tickets)| tickets).collect())
            })
            .unwrap_or_default()
    }
}

#[derive(Debug, Default, Hash, PartialEq, Eq, PartialOrd, Ord, Clone, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct CurrentEvent {
    pub name: String,
    pub description: String,
    pub date: u128,
    pub number_of_tickets: u128,
    pub tickets_left: u128,
}

// Event related stuff
#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum EventAction {
    Create {
        creator: ActorId,
        name: String,
        description: String,
        number_of_tickets: u128,
        date: u128,
    },

    Hold {
        creator: ActorId,
        event_id: u128,
    },

    BuyTickets {
        creator: ActorId,
        event_id: u128,
        amount: u128,
        metadata: Vec<Option<TokenMetadata>>,
    },
}

#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum EventsEvent {
    Creation {
        creator: ActorId,
        event_id: u128,
        number_of_tickets: u128,
        date: u128,
    },
    Hold {
        creator: ActorId,
        event_id: u128,
    },
    Purchase {
        creator: ActorId,
        event_id: u128,
        amount: u128,
    },
}

#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum EventError {
    AlreadyRegistered,
    ZeroAddress,
    LessThanOneTicket,
    NotEnoughTickets,
    NotEnoughMetadata,
    NotCreator,
    EventNotFound,
    EventIdNotFound,
    BuyMintError(String),
    HoldMintError(String),
    HoldBurnError(String),
}

#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum EventStateQuery {
    CurrentEvent,
    Buyers,
    UserTickets { user: ActorId },
}

#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum EventStateReply {
    CurrentEvent(CurrentEvent),
    Buyers(Vec<ActorId>),
    UserTickets(Vec<Option<TokenMetadata>>),
}

#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitEvent {
    pub owner_id: ActorId,
    pub mtk_contract: ActorId,
}
