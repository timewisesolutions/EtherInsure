// Interaction with the blockchain

import { ethers  } from "ethers";
import { signer } from "@/components/PolicyPayment";
import POLICY_ABI from "@/services/blockchain/abi/Policy.json"
import CATPOLICY_ABI from "@/services/blockchain/abi/Cat.json"
import DOGPOLICY_ABI from "@/services/blockchain/abi/Dog.json"
import config from '@/services/blockchain/config.json';
//import {config} from '@/services/blockchain/config';

let contract : ethers.Contract | null = null
let changeInPetType = '' 

/*
export const instantiateContract = async (petType:string) => {
    const chainId = await signer.getChainId()
    const index = config.findIndex((obj) => obj.chainId === chainId)
    console.log("chain id and index", chainId, index)
    if(petType == 'Dog' && index !== -1){
        const dogPolicyAddress = config[index].DogPolicy?.address;
        console.log("dog policy address", dogPolicyAddress)
        if (dogPolicyAddress) {
            contract = new ethers.Contract(dogPolicyAddress, DOGPOLICY_ABI,signer);
        }
    }else if(petType == 'Cat'  && index !== -1){
        const catPolicyAddress = config[index].CatPolicy?.address;
        if(catPolicyAddress){
            contract = new ethers.Contract(catPolicyAddress, CATPOLICY_ABI,signer);
        }
    }
    else{
        console.error("Contract not found");
    }
}
*/

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

export const policy_get_premium = async () =>{
    const valueBigInt =   await contract?.get_premium_per_annum()
    const valueNumber: number = Number(valueBigInt) / (10 ** 18);
    return valueNumber
}

export const policy_get_premiumEth = async () =>{
    const weiValue =   await contract?.get_premium_per_annum_inEth()
    return ethers.utils.formatEther(weiValue)
}

export const create_pet_policy = async(ipfs_link:string, 
                                      premiumEth:string, 
                                      callback: any ) =>{
    /*
    //console.log(tx)
    //console.log(tx.receipt.events[0].event)
    //console.log(tx.receipt.events[0].args)
    */
    const tx = await contract?.connect?.(signer).create_policy(ipfs_link, 
                                                            {value: ethers.utils.parseEther(premiumEth)})
    const receipt = await tx.wait()
    contract?.on("NewPolicy", async (policyHolder, policyNumber, insured_amount, event) => {
        callback(policyHolder, policyNumber, insured_amount)
        //const tx =   await contract?.get_policy_details(policyNumber)
        //console.log("get policy details response:", tx)
    })
}

export const get_policy_details = async (policyNo: number) => {
        const tx =   await contract?.get_policy_details(policyNo)
        const policy_details = tx[0]
        const premium_paid   = tx[1]
        return { policy_details, premium_paid }
}