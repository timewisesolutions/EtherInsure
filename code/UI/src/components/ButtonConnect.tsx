import { Box } from "@chakra-ui/react";
import { ConnectWallet} from "@thirdweb-dev/react";
import { useColorMode } from "@chakra-ui/react";


const ButtonConnect = () => {
    const {colorMode} = useColorMode();
    const className = colorMode === "dark" ? "connect-wallet-dark" : "connect-wallet-light";

    return (
        <Box>
            <ConnectWallet
            className={className}
            />
        </Box>
  );
}

export default ButtonConnect