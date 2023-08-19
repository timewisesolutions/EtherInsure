import { policy_get_premium, policy_get_premiumEth, create_pet_policy } from "@/services/blockchain/Blockchain"
import { Box, Button, Container, Flex, Image, Text, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import {PetInfoContext } from "@/context/PetInfoContext"
import { SmartContract, useContract, useAddress, ContractEvent } from "@thirdweb-dev/react";
import {storeFile} from "@/services/ipfs/Web3Storage"

import POLICY_ABI from "@/services/blockchain/abi/Policy.json"
import DOGPOLICY_ABI from "@/services/blockchain/abi/Dog.json"
import CATPOLICY_ABI from "@/services/blockchain/abi/Cat.json"
import config from '@/services/blockchain/config.json';

const IPFS_FILE_EXTENSION ='.ipfs.w3s.link'

const PolicyPayment = ()  => {
    const petInfoContext = useContext(PetInfoContext);
    const [loadState, setLoadState] = useState(false)
    const [loadText, setLoadText] = useState('')
    const [premium, setPremium] = useState(0)
    const [premiumEth, setPremiumEth] = useState('')
    const [isWalletConnected, setIsWalletConnected] = useState(true)
    const toast = useToast()
    const walletAddress = useAddress();

    let contract = useContract(config[31337].DogPolicy.address, DOGPOLICY_ABI)
    if (petInfoContext?.type === 'Cat'){
        contract = useContract(config[31337].CatPolicy.address, CATPOLICY_ABI)
    }

    const handleGetPremium = async (contract: SmartContract | undefined) => {
        if (contract){
            const premium = await policy_get_premium(contract);
            const premiumEth = await policy_get_premiumEth(contract);
            setPremium(premium);
            setPremiumEth(premiumEth)
        }
    };

    const eventCallback =async (event: ContractEvent<Record<string, any>>) =>{
        const result = {insured_amount: Number(event.data.insured_amount),policyNumber: Number(event.data.policyNumber)}
        if (result.policyNumber >= 0){
            toast({ title: "Policy Created Successfull !", 
                        status: 'success',
                        position: 'top'
                })
            setLoadState(false)
        }
    }

    const payCreatePolicy = async () =>{
        if (walletAddress === undefined) {
            setIsWalletConnected(false);
            return
        }
        setLoadState(true)
        setLoadText('Submitting')
        // Store all the pet info in IPFS - web3.storage
        if (petInfoContext){
            let petIpfsLink = await storeFile(petInfoContext)
            petIpfsLink = petIpfsLink + IPFS_FILE_EXTENSION
            await create_pet_policy(contract.contract, petIpfsLink, premiumEth, eventCallback)
        }
    }

    useEffect(() => {
        handleGetPremium(contract.contract);
    }, [contract]);

    return (
     <>
    { contract.isLoading ? (<>Loading....</>) 
      : contract.error ? (<>Error: Blockchain Connect</>) 
      : (
            <Flex as="main" role="main" direction="column" flex="1" py={{ base: "16", lg: "10" }}>
                <Container flex="1">
                    <Box as="section" bg="bg-surface" py={{ base: '16', md: '24' }} minH='md'>
            {petInfoContext? (
            <>
                <Text fontWeight={'bold'} fontSize={20}  textAlign="center">Your Pet Information:</Text>
                <br/>
                <Box display="grid" gridGap={1} justifyContent={'center'}>
                    <Text fontWeight={'bold'}>Type: {petInfoContext.type}</Text>
                    <Text fontWeight={'bold'}>Breed: {petInfoContext.breed}</Text>
                    <Text fontWeight={'bold'}>Name: {petInfoContext.name} </Text>
                    <Text fontWeight={'bold'}>Age: {petInfoContext.age.years} years, {petInfoContext.age.months} months</Text>
                    <Text fontWeight={'bold'}>Location: {petInfoContext.location.city}, {petInfoContext.location.zipCode}</Text>
                    <Text fontWeight={'bold'}>Pre-Medical Condition: {petInfoContext.preMedicalCondition}</Text>
                    <Text fontWeight={'bold'}>Premium(Pay):  {premiumEth} eth  </Text>
                    <Text fontWeight={'bold'}>Premium(in Aud $ equal): $ {premium}  </Text>
                    <Image borderRadius='full' boxSize='50px' src={petInfoContext.image}/>
                    <Button onClick={payCreatePolicy} isLoading={loadState} loadingText={loadText} m='auto' colorScheme='blue'
                            variant="solid" _hover={{ bg: 'blue.300' }}>Pay</Button>
                </Box>
            </>
            ):(
            <Text>No Pet Info Available</Text>
            )}

            {!isWalletConnected && <Text fontSize={15} fontWeight={'bold'}>Connect your wallet and try again</Text>}
            </Box>
            </Container>
            </Flex>
        )}
    </>
  )
}

export default PolicyPayment