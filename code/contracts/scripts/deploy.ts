import { ethers, artifacts } from "hardhat";
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

async function main() {

  //const policy = await ethers.deployContract("PetPolicy");
  //await policy.waitForDeployment();

   const [deployer] = await ethers.getSigners();

    console.log(
    "Deploying contracts with the account:",
    deployer.address
    );

    const Policy = await ethers.getContractFactory("PetPolicy");
    let contract = await Policy.deploy(0,0,0);
    const policy  = await contract.waitForDeployment()

    console.log("PetPolicy deployed at:", await policy.getAddress());

    const DogPolicy = await ethers.getContractFactory("DogPolicy");
    contract = await DogPolicy.deploy();
    const dogpolicy  = await contract.waitForDeployment()
    console.log("DogPolicy deployed at:", await dogpolicy.getAddress());

    const CatPolicy = await ethers.getContractFactory("CatPolicy");
    contract = await CatPolicy.deploy();
    const catpolicy  = await contract.waitForDeployment()
    console.log("CatPolicy deployed at:", await catpolicy.getAddress());

    let abidata =  await artifacts.readArtifact("PetPolicy")
    syncWriteFile('Policy.json', JSON.stringify(abidata.abi, null, 2))

    abidata =  await artifacts.readArtifact("DogPolicy")
    syncWriteFile('Dog.json', JSON.stringify(abidata.abi, null, 2))

    abidata =  await artifacts.readArtifact("CatPolicy")
    syncWriteFile('Cat.json', JSON.stringify(abidata.abi, null, 2))
}

function syncWriteFile(filename: string, data: any) {
    const dir_path = '../UI/src/services/blockchain/abi'
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
    writeFileSync(join(dir_path, filename), data, {
      flag: 'w',
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
