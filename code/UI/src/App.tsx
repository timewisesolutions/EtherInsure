import Home from "@/pages/Home";
import Policy from "@/pages/Policy"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Claims from "./pages/Claims";
import Dashboard from "./pages/Dashboard";
import { ThirdwebProvider} from "@thirdweb-dev/react";
import {Sepolia, Goerli, Localhost, Ethereum, Chain} from '@thirdweb-dev/chains'
import ChainContext from "@/context/Chain";
import { useState } from "react";

const App = () => {
    const [selectedChain, setSelectedChain] = useState<Chain>(Goerli);
    //const activeChain = Localhost
    return (
        <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
        <ThirdwebProvider
            clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
            activeChain={selectedChain}
        >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/Home" element={<Home/>}></Route>
                <Route path="/Policy" element={<Policy/>}></Route>
                <Route path="/Claims" element={<Claims/>}></Route>
                <Route path="/Dashboard" element={<Dashboard/>}></Route>
                <Route path="/*" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
        </ThirdwebProvider>
        </ChainContext.Provider>
    );
}
export default App;