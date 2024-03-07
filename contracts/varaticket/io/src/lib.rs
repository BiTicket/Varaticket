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
pub struct State {
    pub owner_id: ActorId,
    pub contract_id: ActorId,

    pub name: String,
    pub description: String,

    pub ticket_ft_id: u128,
    pub creator: ActorId,
    pub number_of_tickets: u128,
    pub tickets_left: u128,
    pub date: u128,

    pub buyers: Vec<ActorId>,

    pub id_counter: u128,
    pub event_id: u128,
    pub running: bool,
    /// user to token id to metadata
    pub metadata: Vec<(ActorId, Tickets)>,
    pub token_id: u128,
}

pub type Tickets = Vec<(u128, Option<TokenMetadata>)>;

#[doc(hidden)]
impl State {
    pub fn current_event(self) -> CurrentEvent {
        CurrentEvent {
            name: self.name,
            description: self.description,
            date: self.date,
            number_of_tickets: self.number_of_tickets,
            tickets_left: self.tickets_left,
        }
    }

    pub fn user_tickets(self, user: ActorId) -> Vec<Option<TokenMetadata>> {
        self.metadata
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
        token_id: u128,
    },
    Hold,
    BuyTickets {
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
        event_id: u128,
    },
    Purchase {
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
