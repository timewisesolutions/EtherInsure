import { Box } from "@chakra-ui/react";
import { ConnectWallet,useNetworkMismatch, useSwitchChain} from "@thirdweb-dev/react";
import { useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import ChainContext from "@/context/Chain";
import {Sepolia, Goerli, Localhost, Ethereum} from '@thirdweb-dev/chains'

const ButtonConnect = () => {
    const { selectedChain, setSelectedChain } = useContext(ChainContext)
    const {colorMode} = useColorMode()
    const className = colorMode === "dark" ? "connect-wallet-dark" : "connect-wallet-light"
    const isMismatched = useNetworkMismatch();
    const switchChain = useSwitchChain();

    return(
            <Box>
                <ConnectWallet
                    className={className}
                    networkSelector={{
                        popularChains: [Sepolia, Goerli, Localhost, Ethereum],
                        onSwitch(chain) {
                            setSelectedChain(chain)
                            if (isMismatched){ switchChain(selectedChain.chainId)}
                        },
                    }}
                />
            </Box>
        )

}

export default ButtonConnect