import { ethers, artifacts } from "hardhat";
import { writeFileSync } from "fs";
import { join } from "path";
import {
  get_company_address,
  get_registered_vet_addresses,
  get_vaultInvesters,
} from "../config/config";
import { TransactionRequest } from "ethers";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Policy = await ethers.getContractFactory("PetPolicy");
  let contract = await Policy.deploy(0, 0, 0);
  const policy = await contract.waitForDeployment();
  console.log("PetPolicy deployed at:", await policy.getAddress());

  const DogPolicy = await ethers.getContractFactory("DogPolicy");
  contract = await DogPolicy.deploy();
  const dogpolicy = await contract.waitForDeployment();
  console.log("DogPolicy deployed at:", await dogpolicy.getAddress());

  const CatPolicy = await ethers.getContractFactory("CatPolicy");
  contract = await CatPolicy.deploy();
  const catpolicy = await contract.waitForDeployment();
  console.log("CatPolicy deployed at:", await catpolicy.getAddress());

  let abidata = await artifacts.readArtifact("PetPolicy");
  syncWriteFile("Policy.json", JSON.stringify(abidata.abi, null, 2));

  abidata = await artifacts.readArtifact("DogPolicy");
  syncWriteFile("Dog.json", JSON.stringify(abidata.abi, null, 2));

  abidata = await artifacts.readArtifact("CatPolicy");
  syncWriteFile("Cat.json", JSON.stringify(abidata.abi, null, 2));

  // Deploy EtherPool with balance of 100 Ethers
  const Vault = await ethers.getContractFactory("Vault");
  const vault_investers = get_vaultInvesters();
  // Iterate over the entries of the map.
  const investers = [...vault_investers.keys()];
  const shares = [...vault_investers.values()];
  let txn = await Vault.deploy(investers, shares);
  const vault = await txn.waitForDeployment();
  console.log("Vault deployed at:", await vault.getAddress());
  console.log(
    "Vault balance before:",
    ethers.formatEther(await vault.get_balance())
  );
  const transaction = await vault.depositEther({
    value: ethers.parseUnits("1", "ether"),
  });
  console.log(
    "Vault balance after:",
    ethers.formatEther(await vault.get_balance())
  );
  const provider = ethers.provider;
  const balance = await provider.getBalance(deployer);
  console.log("Wallet signer19 balance:", ethers.formatEther(balance));
  // deploy multisig, for which we first read the config params for the addresses of the constructor
  const company = get_company_address();
  const vet = get_registered_vet_addresses();
  const owners = [...company, ...vet];
  const MultiSig = await ethers.getContractFactory("MultiSigWallet");
  txn = await MultiSig.deploy(owners, 3);
  const multisig = await txn.waitForDeployment();
  console.log("Multisig deployed at:", await multisig.getAddress());
  abidata = await artifacts.readArtifact("MultiSigWallet");
  syncWriteFile("MultiSigWallet.json", JSON.stringify(abidata.abi, null, 2));

  //console.log("total confirmations:", await tx.numConfirmationsRequired());
  //console.log("Owners:", await tx.getOwners());

  /* test withdrawal from Vault  let txn = await Vault.deploy(investers, shares);
  const withdraw = await vault.withDrawAll();
  console.log(
    "Vault balance after withdrawal:",
    ethers.formatEther(await vault.get_balance())
  );
  */
}

function syncWriteFile(filename: string, data: any) {
  const dir_path = "../UI/src/services/blockchain/abi";
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  writeFileSync(join(dir_path, filename), data, {
    flag: "w",
  });
  //const contents = readFileSync(join(dir_path, filename), 'utf-8');
  //return contents;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
