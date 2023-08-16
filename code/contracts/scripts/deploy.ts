import { ethers } from "hardhat";

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


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
