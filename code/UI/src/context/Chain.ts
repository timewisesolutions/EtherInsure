import { createContext } from "react";
import {Sepolia, Goerli, Localhost, Ethereum} from '@thirdweb-dev/chains'
import {Chain} from '@thirdweb-dev/chains'
const ChainContext = createContext({
    selectedChain: Goerli as Chain,
    setSelectedChain: (chain: Chain ) => {},
});

export default ChainContext;