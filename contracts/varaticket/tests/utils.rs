use events_io::*;
use gstd::{prelude::*, ActorId, Encode};
use gtest::{Program, System};
use multi_token_io::{InitMtk, TokenMetadata};

pub const USER: u64 = 193;
pub const MTK_ID: u64 = 2;
pub const EVENT_ID: u128 = 0;
pub const _TOKEN_ID: u128 = 1;
pub const NUMBER_OF_TICKETS: u128 = 100;
pub const AMOUNT: u128 = 1;
pub const DATE: u128 = 100000;

pub fn init_system() -> System {
    let system = System::new();
    system.init_logger();

    system
}

pub fn init_event(sys: &System) -> Program<'_> {
    let event_program = Program::current_opt(sys);
    let mtk_program = Program::from_file(
        sys,
        "../varaticket/target/wasm32-unknown-unknown/debug/multi_token.opt.wasm",
    );
    let res = mtk_program.send(
        USER,
        InitMtk {
            name: String::from("Multitoken for a event"),
            symbol: String::from("MTC"),
            base_uri: String::from(""),
        },
    );

    assert!(!res.main_failed());
    assert!(!event_program
        .send(
            USER,
            InitEvent {
                owner_id: USER.into(),
                mtk_contract: MTK_ID.into(),
            },
        )
        .main_failed());

    event_program
}

pub fn create(
    event_program: &Program<'_>,
    creator: ActorId,
    name: String,
    description: String,
    event_img_url: String,
    number_of_tickets: u128,
    event_init_date: u128,
    event_id: u128,
) {
    let res = event_program.send(
        USER,
        EventAction::Create {
            creator,
            name,
            description,
            number_of_tickets,
            event_img_url,
            event_init_date,
        },
    );

    assert!(res.contains(&(
        USER,
        Ok::<EventsEvent, EventError>(EventsEvent::Creation {
            creator,
            event_id,
            number_of_tickets,
            event_init_date,
        })
        .encode()
    )));
}

pub fn buy(
    event_program: &Program<'_>,
    creator: ActorId,
    event_id: u128,
    amount: u128,
    metadata: Vec<Option<TokenMetadata>>,
    error: Option<EventError>,
) {
    let res = event_program.send(
        USER,
        EventAction::BuyTickets {
            creator,
            event_id,
            amount,
            metadata,
        },
    );

    if let Some(error) = error {
        assert!(res.contains(&(USER, Err::<EventsEvent, EventError>(error).encode())));
    } else {
        assert!(res.contains(&(
            USER,
            Ok::<EventsEvent, EventError>(EventsEvent::Purchase {
                creator,
                event_id,
                amount
            })
            .encode()
        )));
    }
}

pub fn hold(event_program: &Program<'_>, creator: ActorId, event_id: u128) {
    let res = event_program.send(USER, EventAction::Close { creator, event_id });

    assert!(res.contains(&(
        USER,
        Ok::<EventsEvent, EventError>(EventsEvent::Close { creator, event_id }).encode()
    )));
}

pub fn check_current_event(
    event_program: &Program<'_>,
    creator: ActorId,
    event_id: u128,
    name: String,
    description: String,
    event_init_date: u128,
    number_of_tickets: u128,
    tickets_left: u128,
) {
    let state: State = event_program.read_state(0).expect("Can't read state");

    let CurrentEvent {
        name: true_name,
        description: true_description,
        event_img_url: _,
        event_init_date: true_date,
        number_of_tickets: true_number_of_tickets,
        tickets_left: true_tickets_left,
    } = state.current_event(creator, event_id);

    if name != true_name {
        std::panic!("EVENT: Event name differs.");
    }
    if description != true_description {
        std::panic!("EVENT: Event description differs.");
    }
    if event_init_date != true_date {
        std::panic!("EVENT: Event date differs.");
    }
    if number_of_tickets != true_number_of_tickets {
        std::panic!("EVENT: Event number of tickets differs.");
    }
    if tickets_left != true_tickets_left {
        std::panic!("EVENT: Event number of tickets left differs.");
    }
}

pub fn check_user_tickets(
    event_program: &Program<'_>,
    creator: ActorId,
    event_id: u128,
    user: ActorId,
    tickets: Vec<Option<TokenMetadata>>,
) {
    let state: State = event_program.read_state(0).expect("Can't read state");
    let true_tickets = state.user_tickets(creator, event_id, user);

    if tickets != true_tickets {
        std::panic!("EVENT: User tickets differ.");
    }
}

pub fn check_buyers(
    event_program: &Program<'_>,
    creator: ActorId,
    event_id: u128,
    buyers: Vec<ActorId>,
) {
    let state: State = event_program.read_state(0).expect("Can't read state");

    let state_buyers = state.current_event_buyers(creator, event_id);

    if buyers != state_buyers {
        std::panic!("EVENT: Buyers list differs.");
    }
}
