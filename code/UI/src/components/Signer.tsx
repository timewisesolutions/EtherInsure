import { useToast } from "@chakra-ui/react";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";

let signer: ethers.Signer;
export { signer };

const Signer = () => {
  const walletAddress = useAddress();
  const toast = useToast();
  if (!walletAddress) {
    toast({
      title: "Connect Wallet First!",
      status: "error",
      position: "top",
    });
    return <></>;
  }

  signer = useSigner() as ethers.Signer;
  return <></>;
};

export default Signer;
