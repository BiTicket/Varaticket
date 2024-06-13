import { Center, HStack, VStack } from "@chakra-ui/react";
import { Box, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel  } from '@chakra-ui/react';
import { Ticketing } from "./Ticketing";
import { ListEvents } from "./ListEvents";
import { BuyTicket } from "./BuyTicket";
import { HoldEvent } from "./HoldTicket";

function Home() {
  return (
    <Center>
      <HStack>
        <VStack>
          <Tabs>
            <TabList>
              <Tab>List Events</Tab>
              <Tab>Create Event</Tab>
              <Tab>Buy Ticket</Tab>
              <Tab>Hold Ticket</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ListEvents />
              </TabPanel>
              <TabPanel>
                <Ticketing />
              </TabPanel>
              <TabPanel>
                <BuyTicket />
              </TabPanel>
              <TabPanel>
                <HoldEvent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </HStack>
    </Center>
  );
}

export { Home };
