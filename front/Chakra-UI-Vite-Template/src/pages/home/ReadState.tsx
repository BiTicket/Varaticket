import { ProgramMetadata } from "@gear-js/api";
import { useState } from "react";
import { useApi, useAlert } from "@gear-js/react-hooks";
import { Button, Card, Center, Heading, VStack, Text } from "@chakra-ui/react";

function ReadState() {
  const { api } = useApi();
  const alert = useAlert();
  const [fullState, setFullState] = useState<any | undefined>(0);
  const color = (fullState.currentLight) ?? "Black";

   // Add your programID
   const programIDFT =
   "0x4848ad1c5567195211db3160375dc7b29cf746f6741388da7562f06044ebc12e";

 // Add your metadata.txt
 const meta =
   "00020000000100000000010100000000000000000102000000750424000808696f48547261666669634c69676874416374696f6e00010c14477265656e0000001859656c6c6f770001000c52656400020000040808696f44547261666669634c696768744576656e7400010c14477265656e0000001859656c6c6f770001000c52656400020000080808696f4c496f547261666669634c696768745374617465000008013463757272656e745f6c696768740c0118537472696e67000124616c6c5f75736572731001585665633c284163746f7249642c20537472696e67293e00000c00000502001000000214001400000408180c001810106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001c01205b75383b2033325d00001c000003200000002000200000050300";

  const metadata = ProgramMetadata.from(meta);

  const getState = () => {
    api.programState
      .read({ programId: programIDFT}, metadata)
      .then((result) => {
        setFullState(result.toJSON());
        //console.log(fullState);
      })
      .catch(({ message }: Error) => alert.error(message));
  };

  getState();

  return (
    <Card>
      <Center>
        <VStack>
          <Heading>Traffic-light</Heading>
          <Button
            borderRadius="50px"
            w="400px"
            h="400px"
            backgroundColor={color ?? "black"}
          >
            Light
          </Button>

          <Heading>State Contract</Heading>
          <Text>{JSON.stringify(fullState.currentLight)}</Text>
        </VStack>
      </Center>
    </Card>
  );
}

export { ReadState };
