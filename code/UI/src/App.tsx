import Home from "@/pages/Home";
import Policy from "@/pages/Policy"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Claims from "./pages/Claims";
import Dashboard from "./pages/Dashboard";
import { ThirdwebProvider, useChain, useChainId } from "@thirdweb-dev/react";
import {Sepolia, Goerli, Localhost} from '@thirdweb-dev/chains'

const App = () => {
    const activeChain = Localhost;
    return (
        <ThirdwebProvider
            clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
            activeChain={activeChain}
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
    );
}
export default App;