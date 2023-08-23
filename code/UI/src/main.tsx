import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
//import { ThirdwebProvider, coinbaseWallet, metamaskWallet } from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react'


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <React.StrictMode>
            <ChakraProvider>
                <App />
            </ChakraProvider>
    </React.StrictMode>
);
