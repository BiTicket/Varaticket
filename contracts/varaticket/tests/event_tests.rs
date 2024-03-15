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

    // create(
    //     &event_program,
    //     USER.into(),
    //     String::from("Sum 421"),
    //     String::from("Sum 421 concert in Madrid. 26/08/2022"),
    //     NUMBER_OF_TICKETS,
    //     DATE,
    //     2,
    // );

    // create(
    //     &event_program,
    //     USER.into(),
    //     String::from("Sum 4211"),
    //     String::from("Sum 4211 concert in Madrid. 26/08/2022"),
    //     NUMBER_OF_TICKETS,
    //     DATE,
    //     3,
    // );

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
    )
}

// #[test]
// fn buy_tickets() {
//     let system = init_system();
//     let event_program = init_event(&system);
//     create(
//         &event_program,
//         USER.into(),
//         String::from("Sum 41"),
//         String::from("Sum 41 concert in Madrid. 26/08/2022"),
//         NUMBER_OF_TICKETS,
//         DATE,
//         EVENT_ID,
//     );

//     let metadata = vec![Some(TokenMetadata {
//         title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
//         description: Some(String::from(
//             "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 4.",
//         )),
//         media: Some(String::from("sum41.com")),
//         reference: Some(String::from("UNKNOWN")),
//     })];

//     buy(&event_program, EVENT_ID, AMOUNT, metadata.clone(), None);
//     check_buyers(&event_program, vec![ActorId::from(USER)]);
//     check_user_tickets(&event_program, ActorId::from(USER), metadata);
// }

// #[test]
// fn buy_tickets_failures() {
//     let system = init_system();
//     let event_program = init_event(&system);
//     create(
//         &event_program,
//         USER.into(),
//         String::from("Sum 41"),
//         String::from("Sum 41 concert in Madrid. 26/08/2022"),
//         NUMBER_OF_TICKETS,
//         DATE,
//         EVENT_ID,
//     );

//     // MUST FAIL since Zero address
//     let res = event_program.send(
//         0,
//         EventAction::BuyTickets {
//             amount: 0,
//             metadata: vec![None],
//         },
//     );
//     assert!(res.contains(&(
//         0,
//         Err::<EventsEvent, EventError>(EventError::ZeroAddress).encode()
//     )));

//     // MUST FAIL since we're buying < 1 ticket
//     buy(
//         &event_program,
//         EVENT_ID,
//         0,
//         vec![None],
//         Some(EventError::LessThanOneTicket),
//     );

//     // MUST FAIL since we're buying more tickets than there are
//     buy(
//         &event_program,
//         EVENT_ID,
//         NUMBER_OF_TICKETS + 1,
//         vec![None; (NUMBER_OF_TICKETS + 1) as usize],
//         Some(EventError::NotEnoughTickets),
//     );

//     // MUST FAIL since metadata is not provided for all tickets
//     buy(
//         &event_program,
//         EVENT_ID,
//         AMOUNT + 3,
//         vec![None; (AMOUNT + 1) as usize],
//         Some(EventError::NotEnoughMetadata),
//     );
// }

// #[test]
// fn hold_event() {
//     let system = init_system();
//     let event_program = init_event(&system);

//     create(
//         &event_program,
//         USER.into(),
//         String::from("Sum 41"),
//         String::from("Sum 41 concert in Madrid. 26/08/2022"),
//         NUMBER_OF_TICKETS,
//         DATE,
//         EVENT_ID,
//     );

//     let metadata = vec![Some(TokenMetadata {
//         title: Some(String::from("Sum 41 concert in Madrid 26/08/2022")),
//         description: Some(String::from(
//             "Sum 41 Madrid 26/08/2022 Ticket. Row 4. Seat 4.",
//         )),
//         media: Some(String::from("sum41.com")),
//         reference: Some(String::from("UNKNOWN")),
//     })];

//     buy(&event_program, EVENT_ID, AMOUNT, metadata, None);

//     let res = event_program.send(USER + 1, EventAction::Hold);
//     assert!(res.contains(&(
//         USER + 1,
//         Err::<EventsEvent, EventError>(EventError::NotCreator).encode()
//     )));

//     hold(&event_program, EVENT_ID);
// }
