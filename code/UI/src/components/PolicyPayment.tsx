import { policy_get_premium, policy_get_premiumEth } from "@/services/blockchain/Blockchain"
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import {PetInfoContext } from "@/context/PetInfoContext"

import POLICY_ABI from "@/services/blockchain/abi/Policy.json"
import DOGPOLICY_ABI from "@/services/blockchain/abi/Dog.json"
import CATPOLICY_ABI from "@/services/blockchain/abi/Cat.json"
import config from '@/services/blockchain/config.json';
import { SmartContract, useContract } from "@thirdweb-dev/react";

const PolicyPayment = ()  => {
    const petInfoContext = useContext(PetInfoContext);
    const [premium, setPremium] = useState(0)
    const [premiumEth, setPremiumEth] = useState('')

    let contract = useContract(config[31337].DogPolicy.address, DOGPOLICY_ABI)
    if (petInfoContext?.Type === 'Cat'){
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

     useEffect(() => {
        handleGetPremium(contract.contract);
    }, [contract]);

    const buttonHandle = async () =>{
        const premium = await policy_get_premium(contract.contract)
        const premiumEth = await policy_get_premiumEth(contract.contract)
        console.log("Premium($):", '$' + premium)
        console.log("Premium(ETH):",  premiumEth + ' Eth')
    }
    if ( (petInfoContext=== undefined) ||contract.isLoading){
        return <>Loading....</>
    }else if (contract.error){
        return <>Error: Blockchain connect....</>
    }

    return (
     <>
        <Flex as="main" role="main" direction="column" flex="1" py={{ base: "16", lg: "10" }}>
            <Container flex="1">
                <Box as="section" bg="bg-surface" py={{ base: '16', md: '24' }} minH='md'>
         {petInfoContext? (
          <>
         <Text fontWeight={'bold'} fontSize={20}  textAlign="center">Your Pet Information:</Text>
         <br/>
          <Box display="grid" gridGap={1} justifyContent={'center'}>
            <Text fontWeight={'bold'}>Type: {petInfoContext.Type}</Text>
            <Text fontWeight={'bold'}>Breed: {petInfoContext.breed}</Text>
            <Text fontWeight={'bold'}>Name: {petInfoContext.name} </Text>
            <Text fontWeight={'bold'}>Age: {petInfoContext.age.years} years, {petInfoContext.age.months} months</Text>
            <Text fontWeight={'bold'}>Location: {petInfoContext.location.city}, {petInfoContext.location.zipCode}</Text>
            <Text fontWeight={'bold'}>Pre-Medical Condition: {petInfoContext.preMedicalCondition}</Text>
            <Text fontWeight={'bold'}>Premium(Pay):  {premiumEth} eth  </Text>
            <Text fontWeight={'bold'}>Premium(in Aud $ equal): $ {premium}  </Text>
            <Button onClick={buttonHandle}>Button</Button>
          </Box>
          </>
        ) : (
          <Text>No Pet Info Available</Text>
        )}
        </Box>
        </Container>
        </Flex>
    </>
  )
}

export default PolicyPayment