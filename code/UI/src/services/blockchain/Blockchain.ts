// Interaction with the blockchain

import { ContractEvent, SmartContract, useContractEvents } from "@thirdweb-dev/react";
import { ethers } from "ethers";



export const policy_get_premium = async (contract:SmartContract | undefined) =>{
    const valueBigInt =   await contract?.call("get_premium_per_annum")
    const valueNumber: number = Number(valueBigInt) / (10 ** 18);
    return valueNumber
}

export const policy_get_premiumEth = async (contract:SmartContract | undefined) =>{
    const weiValue =   await contract?.call("get_premium_per_annum_inEth")
    return ethers.utils.formatEther(weiValue)
}

export const create_pet_policy = async(contract:SmartContract | undefined, ipfs_link:string, premiumEth:string, mycallback: { (event: ContractEvent<Record<string, any>>): Promise<void>; (event: ContractEvent<Record<string, any>>): void; }) =>{
    const tx = await contract?.call("create_policy", [ipfs_link], {value: ethers.utils.parseEther(premiumEth) })
    //console.log(tx)
    //console.log(tx.receipt.events[0].event)
    //console.log(tx.receipt.events[0].args)
    const unsubscribe = contract?.events.addEventListener("NewPolicy", mycallback)
}