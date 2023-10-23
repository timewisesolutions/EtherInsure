// Interaction with the blockchain

import { BigNumber, ethers } from "ethers";
import { signer } from "@/components/Signer";
import POLICY_ABI from "@/services/blockchain/abi/Policy.json";
import CATPOLICY_ABI from "@/services/blockchain/abi/Cat.json";
import DOGPOLICY_ABI from "@/services/blockchain/abi/Dog.json";
import MULTISIG_ABI from "@/services/blockchain/abi/MultiSigWallet.json";

//import config from '@/services/blockchain/config.json';
import { config } from "@/services/blockchain/config";

let contract: ethers.Contract | null = null;
let multiSigContract: ethers.Contract | null = null;
/*
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
*/

// These functions belong to Policy contract
export const instantiatePetContract = async (petType: string) => {
  const policyAddressAndAbi = await getPetTypeDeployedAddress(petType);
  const policyAddress = policyAddressAndAbi?.policyAddress;
  const policyAbi = policyAddressAndAbi?.policyAbi;

  if (policyAddress && policyAbi) {
    contract = new ethers.Contract(policyAddress, policyAbi, signer);
    return true;
  }
  console.error("Contract not found");
  return false;
};

export const getPetTypeDeployedAddress = async (petType: string) => {
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
    return { policyAddress, policyAbi };
  }
};

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
  //const receipt = await tx.wait();
  //console.log("tx:", tx);
  //console.log("receipt:", receipt);
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

// These functions belong to MultiSig contract
export const instantiateMultiSigWalletContract = async () => {
  const chainId = await signer.getChainId();
  const index = config.findIndex((obj) => obj.chainId === chainId);
  console.log("chain id and index", chainId, index);
  if (index !== -1) {
    const multiSigWalletAddress = config[index].Multisig?.address;
    const multiSigAbi = MULTISIG_ABI;
    if (multiSigWalletAddress && multiSigAbi) {
      multiSigContract = new ethers.Contract(
        multiSigWalletAddress,
        multiSigAbi,
        signer
      );
      return true;
    }
    console.error("MultiSigContract not found");
    return false;
  }
};

export const submitTx = async (
  petPolicyAddress: string,
  policyNo: number,
  amount: number,
  callback: any
) => {
  let txIndex;
  let to;
  const tx = await multiSigContract
    ?.connect?.(signer)
    .submitTx(petPolicyAddress, policyNo, amount);

  // Wait for the event SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
  //const receipt = await tx.wait();
  multiSigContract?.on(
    "SubmitTransaction",
    async (_msgsender, _txIndex, _to, _value, _, event) => {
      txIndex = _txIndex.toString();
      to = _to;
      callback(_txIndex);
    }
  );
};

export const confirmTransaction = async (claimNo: number, callback: any) => {
  const tx = await multiSigContract
    ?.connect?.(signer)
    .confirmTransaction(claimNo);
  //const receipt = await tx.wait();
  multiSigContract?.on(
    "ConfirmTransaction",
    async (_msgsender, _txIndex, event) => {
      callback(true);
    }
  );
};

export const executeTx = async (claimNo: number, callback: any) => {
  console.log("execute Tx called");
  const chainId = await signer.getChainId();
  const index = config.findIndex((obj) => obj.chainId === chainId);
  const vault_address = config[index].Vault?.address;
  const tx = await multiSigContract
    ?.connect?.(signer)
    .executeTx(claimNo, vault_address);
  //const receipt = await tx.wait();
  multiSigContract?.on(
    "ExecuteClaim",
    async (policyNo, amount, claimTime: BigNumber, event) => {
      callback(claimTime);
    }
  );
};
