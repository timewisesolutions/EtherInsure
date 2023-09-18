// Interaction with the blockchain

import { ethers } from "ethers";
import { signer } from "@/components/Signer";
import POLICY_ABI from "@/services/blockchain/abi/Policy.json";
import CATPOLICY_ABI from "@/services/blockchain/abi/Cat.json";
import DOGPOLICY_ABI from "@/services/blockchain/abi/Dog.json";
//import config from '@/services/blockchain/config.json';
import { config } from "@/services/blockchain/config";

let contract: ethers.Contract | null = null;
let changeInPetType = "";

export const instantiateContract = async (petType: string) => {
  const chainId = await signer.getChainId();
  const index = config.findIndex((obj) => obj.chainId === chainId);
  console.log("chain id and index", chainId, index);

  if (index !== -1) {
    let policyAddress;
    let policyAbi;

    if (petType === "Dog") {
      policyAddress = config[index].DogPolicy?.address;
      policyAbi = DOGPOLICY_ABI;
    } else if (petType === "Cat") {
      policyAddress = config[index].CatPolicy?.address;
      policyAbi = CATPOLICY_ABI;
    }
    if (policyAddress && policyAbi) {
      contract = new ethers.Contract(policyAddress, policyAbi, signer);
      return true;
    }
  }
  console.error("Contract not found");
  return false;
};

/*
export const instantiateContract = async (petType:string) => {

    if(petType == 'Dog'){
        const dogAddress = config[31337].DogPolicy.address
        contract = new ethers.Contract(dogAddress, DOGPOLICY_ABI,signer)
    }else if(petType == 'Cat'){
        const catPolicyAddress = config[31337].CatPolicy.address;
        contract = new ethers.Contract(catPolicyAddress, CATPOLICY_ABI,signer);
    }
    else{
        console.error("Contract not found");
    }
}
*/

export const policy_get_premium = async () => {
  const valueBigInt = await contract?.get_premium_per_annum();
  const valueNumber: number = Number(valueBigInt) / 10 ** 18;
  return valueNumber;
};

export const policy_get_premiumEth = async () => {
  const weiValue = await contract?.get_premium_per_annum_inEth();
  return ethers.utils.formatEther(weiValue);
};

export const create_pet_policy = async (
  ipfs_link: string,
  premiumEth: string,
  callback: any
) => {
  /*
    //console.log(tx)
    //console.log(tx.receipt.events[0].event)
    //console.log(tx.receipt.events[0].args)
    */
  const tx = await contract?.connect?.(signer).create_policy(ipfs_link, {
    value: ethers.utils.parseEther(premiumEth),
  });
  const receipt = await tx.wait();
  contract?.on(
    "NewPolicy",
    async (policyHolder, policyNumber, insured_amount, event) => {
      callback(policyHolder, policyNumber, insured_amount);
    }
  );
};

export const get_policy_details = async (policyNo: number) => {
  const tx = await contract?.get_policy_details(policyNo);
  const policy_details = tx[0];
  const premium_paid = tx[1];
  return { policy_details, premium_paid };
};

export const get_policy_exists_from_policy_number = async (
  policyNo: number
) => {
  let tx,
    error = null;
  try {
    tx = await contract?.get_policy_exists_from_policy_number(policyNo);
  } catch (e: any) {
    error = e.reason;
  }
  return { tx, error };
};
