import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { Button } from "@chakra-ui/react";

function GreenColor() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();

  // Add your programID
  const programIDFT =
  "0x4848ad1c5567195211db3160375dc7b29cf746f6741388da7562f06044ebc12e";

// Add your metadata.txt
const meta =
  "00020000000100000000010100000000000000000102000000750424000808696f48547261666669634c69676874416374696f6e00010c14477265656e0000001859656c6c6f770001000c52656400020000040808696f44547261666669634c696768744576656e7400010c14477265656e0000001859656c6c6f770001000c52656400020000080808696f4c496f547261666669634c696768745374617465000008013463757272656e745f6c696768740c0118537472696e67000124616c6c5f75736572731001585665633c284163746f7249642c20537472696e67293e00000c00000502001000000214001400000408180c001810106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001c01205b75383b2033325d00001c000003200000002000200000050300";

  const metadata = ProgramMetadata.from(meta);

  const message: any = {
    destination: programIDFT, // programId
    payload: "Green",
    gasLimit: 98998192450,
    value: 0,
  };

  const signer = async () => {
    const localaccount = account?.address;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount) {
      // Create a message extrinsic
      const transferExtrinsic = await api.message.send(message, metadata);

      const injector = await web3FromSource(accounts[0].meta.source);

      transferExtrinsic
        .signAndSend(
          account?.address ?? alert.error("No account"),
          { signer: injector.signer },
          ({ status }) => {
            if (status.isInBlock) {
              alert.success(status.asInBlock.toString());
            } else {
              console.log("In Process");
              if (status.type === "Finalized") {
                alert.success(status.type);
              }
            }
          }
        )
        .catch((error: any) => {
          console.log(":( transaction failed", error);
        });
    } else {
      alert.error("Account not available to sign");
    }
  };

  return (
    <Button backgroundColor="green.300" onClick={signer}>
      {" "}
      Green
    </Button>
  );
}

export { GreenColor };
