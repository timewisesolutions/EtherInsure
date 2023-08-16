// Interaction with the blockchain

import { SmartContract } from "@thirdweb-dev/react";
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
