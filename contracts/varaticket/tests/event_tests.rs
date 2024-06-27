use events_io::*;
use gstd::{prelude::*, ActorId, String};
use multi_token_io::TokenMetadata;
mod utils;
use utils::*;

#[test]
fn create_event() {
    let system = init_system();
    let event_program = init_event(&system);
    create(
        &event_program,
        USER.into(),
        String::from("Sum 41"),
        String::from("Sum 41 concert in Madrid. 26/08/2022"),
        NUMBER_OF_TICKETS,
        DATE,
        EVENT_ID,
    );

    create(
        &event_program,
        USER.into(),
        String::from("Sum 42"),
        String::from("Sum 42 concert in Madrid. 26/08/2022"),
        NUMBER_OF_TICKETS,
        DATE,
        1,
    );

    check_current_event(
        &event_program,
        USER.into(),
        EVENT_ID,
        String::from("Sum 41"),
        String::from("Sum 41 concert in Madrid. 26/08/2022"),
        DATE,
        NUMBER_OF_TICKETS,
        // since no tickets are bought so far
        NUMBER_OF_TICKETS,
    );

    // new event from different creator
    let new_creator = USER + 1;
    create(
        &event_program,
        new_creator.into(),
        String::from("Sum 411"),
        String::from("Sum 411 concert in Madrid. 26/08/2022"),
        NUMBER_OF_TICKETS,
        DATE,
        EVENT_ID,
    );

    create(
        &event_program,
        new_creator.into(),
        String::from("Sum 425"),
        String::from("Sum 425 concert in Madrid. 26/08/2022"),
        NUMBER_OF_TICKETS,
        DATE,
        1,
    );

    check_current_event(
        &event_program,
        new_creator.into(),
        1,
        String::from("Sum 425"),
        String::from("Sum 425 concert in Madrid. 26/08/2022"),
        DATE,
        NUMBER_OF_TICKETS,
        // since no tickets are bought so far
        NUMBER_OF_TICKETS,
    )
}

#[test]
fn buy_tickets() {
    let system = init_system();
    let event_program = init_event(&system);
    create(
        &event_program,
        USER.into(),
        String::from("Sum 41"),
        String::from("Sum 41 concert in Madrid. 26/08/2022"),
        NUMBER_OF_TICKETS,
        DATE,
        EVENT_ID,
    );

    create(
        &event_program,
        USER.into(),
        String::from("Sum 42"),
        String::from("Sum 42 concert in Madrid. 26/08/2022"),
        NUMBER_OF_TICKETS,
        DATE,
        EVENT_ID + 1,
    );

    let metadata = vec![
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 4.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 5.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 6.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
    ];

    buy(
        &event_program,
        USER.into(),
        EVENT_ID + 1,
        AMOUNT + 2,
        metadata.clone(),
        None,
    );
    check_buyers(
        &event_program,
        USER.into(),
        EVENT_ID + 1,
        vec![ActorId::from(USER)],
    );
    check_user_tickets(
        &event_program,
        USER.into(),
        EVENT_ID + 1,
        ActorId::from(USER),
        metadata,
    );
}

#[test]
fn buy_tickets_failures() {
    let system = init_system();
    let event_program = init_event(&system);
    create(
        &event_program,
        USER.into(),
        String::from("Sum 41"),
        String::from("Sum 41 concert in Madrid. 26/08/2022"),
        NUMBER_OF_TICKETS,
        DATE,
        EVENT_ID,
    );

    // MUST FAIL since Zero address
    let res = event_program.send(
        0,
        EventAction::BuyTickets {
            creator: 0.into(),
            event_id: EVENT_ID,
            amount: 0,
            metadata: vec![None],
        },
    );
    assert!(res.contains(&(
        0,
        Err::<EventsEvent, EventError>(EventError::ZeroAddress).encode()
    )));

    // MUST FAIL since we're buying < 1 ticket
    buy(
        &event_program,
        USER.into(),
        EVENT_ID,
        0,
        vec![None],
        Some(EventError::LessThanOneTicket),
    );

    // MUST FAIL since we're buying more tickets than there are
    buy(
        &event_program,
        USER.into(),
        EVENT_ID,
        NUMBER_OF_TICKETS + 1,
        vec![None; (NUMBER_OF_TICKETS + 1) as usize],
        Some(EventError::NotEnoughTickets),
    );

    // MUST FAIL since metadata is not provided for all tickets
    buy(
        &event_program,
        USER.into(),
        EVENT_ID,
        AMOUNT + 3,
        vec![None; (AMOUNT + 1) as usize],
        Some(EventError::NotEnoughMetadata),
    );
}

#[test]
fn hold_event() {
    let system = init_system();
    let event_program = init_event(&system);

    create(
        &event_program,
        USER.into(),
        String::from("Sum 41"),
        String::from("Sum 41 concert in Madrid. 26/08/2022"),
        NUMBER_OF_TICKETS,
        DATE,
        EVENT_ID,
    );

    let metadata = vec![
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 4.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 5.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 6.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
    ];

    let metadata_2 = vec![
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 7.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 8.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
        Some(TokenMetadata {
            title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
            description: Some(String::from(
                "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 9.",
            )),
            media: Some(String::from("sum41.com")),
            reference: Some(String::from("UNKNOWN")),
        }),
    ];

    buy(
        &event_program,
        USER.into(),
        EVENT_ID,
        AMOUNT + 2,
        metadata,
        None,
    );

    event_program.send(
        194,
        EventAction::BuyTickets {
            creator: USER.into(),
            event_id: EVENT_ID,
            amount: AMOUNT + 2,
            metadata: metadata_2,
        },
    );

    hold(&event_program, USER.into(), EVENT_ID);
}
