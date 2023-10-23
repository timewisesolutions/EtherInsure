import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();
// goerli
const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY;
const GOERLI_DEPLOYER_KEY = process.env.GOERLI_DEPLOYER_KEY;
// sepolia
const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY;
const SEPOLIA_DEPLOYER_KEY = process.env.SEPOLIA_DEPLOYER_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },

    goerli: {
      chainId: 5,
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_GOERLI_API_KEY}`,
      accounts: [`${GOERLI_DEPLOYER_KEY}`],
    },

    sepolia: {
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_API_KEY}`,
      accounts: [`${SEPOLIA_DEPLOYER_KEY}`],
    },
  },
};

export default config;
/*
For Goerli network:
PetPolicy deployed at: 0x61EF20DFa1e84A24e0869088719b629EF13d6f81
DogPolicy deployed at: 0x06185e058ffacc940BDEC633735CD69fCAa9b170
CatPolicy deployed at: 0x3f15Fb4C4d357200e908a834F3966DD08a96b76D
*/

/*
For Sepolia deployed at
PetPolicy deployed at: 0x07D55B08874295F41E46446d3AD54AB5fF42D7dd
DogPolicy deployed at: 0xCF2F785467CCAD24614645Aa31906527AbB5a19b
CatPolicy deployed at: 0x3eAff1e4876f565E00354Ec7ACdea65c617FEd83
Vault deployed at: 0xC721ec5fF9DCF5441364D2B0115AAD8dA2DA5f2a
Vault balance before: 0.0
Vault balance after: 0.0
Wallet signer19 balance: 9.036439615781232717
Multisig deployed at: 0x3f6552D58e8Fb6BeB56F5E31BC0cB94E75eF12E0

*/
