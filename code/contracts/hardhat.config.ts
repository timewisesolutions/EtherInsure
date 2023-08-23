import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();
// goerli
const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY
const GOERLI_DEPLOYER_KEY = process.env.GOERLI_DEPLOYER_KEY
// sepolia
const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY
const SEPOLIA_DEPLOYER_KEY = process.env.SEPOLIA_DEPLOYER_KEY

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    networks: {
            hardhat: {
                chainId: 1337
            },

            goerli: {
                chainId: 5,
                url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_GOERLI_API_KEY}`,
                accounts: [`${GOERLI_DEPLOYER_KEY}`]
            },
    
            sepolia: {
                chainId: 11155111,
                url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_API_KEY}`,
                accounts: [`${SEPOLIA_DEPLOYER_KEY}`]
        },
    }
};

export default config;
/*
For Goerli network:
PetPolicy deployed at: 0x61EF20DFa1e84A24e0869088719b629EF13d6f81
DogPolicy deployed at: 0x06185e058ffacc940BDEC633735CD69fCAa9b170
CatPolicy deployed at: 0x3f15Fb4C4d357200e908a834F3966DD08a96b76D
*/