import { policy_get_premium, policy_get_premiumEth, create_pet_policy, instantiateContract } from "@/services/blockchain/Blockchain"
import { AbsoluteCenter, Box, Button, Container, Flex, Image, SimpleGrid, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import {useContext, useEffect, useState } from "react";
import {PetInfoContext } from "@/context/PetInfoContext"
import { useAddress, useSigner } from "@thirdweb-dev/react";
import {storeFile} from "@/services/ipfs/Web3Storage"
import PolicyPaymentSuccess from "./PolicyPaymentSuccess";
import { ethers } from "ethers";

let signer: ethers.Signer
export {signer}

const IPFS_FILE_EXTENSION ='.ipfs.w3s.link'

const PolicyPayment = ()  => {

    const petInfoContext = useContext(PetInfoContext)
    const [loadState, setLoadState] = useState(false)
    const [loadText, setLoadText] = useState('')
    const [premium, setPremium] = useState(0)
    const [premiumEth, setPremiumEth] = useState('')
    const [isWalletConnected, setIsWalletConnected] = useState(true)
    const [paymentSuccess, setPaymentSuccess] = useState(false) 
    const [policyNo, setPolicyNo] = useState(-1)
    const [contract, setContract] = useState(false)

    const toast = useToast()
    const walletAddress = useAddress()
    signer =  useSigner() as ethers.Signer

    const handleGetPremium = async () => {
        const premium = await policy_get_premium();
        const premiumEth = await policy_get_premiumEth();
        setPremium(premium);
        setPremiumEth(premiumEth)
    };

    const create_policy_eventCallback =async (policyHolder: string, policyNumber: number, insured_amount: number) =>{
        if (policyNumber >= 0){
            toast({ title: "Policy Created Successfull !", 
                        status: 'success',
                        position: 'top'
                })
            setPolicyNo(policyNumber)
            setLoadState(false)
            setLoadText('')
            setPaymentSuccess(true)
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
            await create_pet_policy(petIpfsLink, premiumEth, create_policy_eventCallback)
        }
    }

    useEffect(() => {
        async function createContract() {
            const result = await instantiateContract(petInfoContext?.type as string)
            if(result === true){
                handleGetPremium()
            }
            setContract(result)
        }
        createContract()
    }, [petInfoContext])

    return (
    <>
    {
        <Container flex="1">
            <Box as="section" bg="bg-surface" py={{ base: '12', md: '20' }} minH='xs'>
            {petInfoContext? (
                paymentSuccess ? (<><PolicyPaymentSuccess policyNo={policyNo}/></>)
                :(
                    <>
                    <Text fontWeight={'semibold'} fontFamily={'mono'} color={'aqua'} fontSize={20}  textAlign="center">Your Pet Information:</Text>
                    <br/>
                    <SimpleGrid textAlign={'center'} columns={2} spacingX='20px' spacingY='10px' >
                        <Box color={useColorModeValue('yellow.600', 'palegoldenrod')} fontWeight={'bold'} height='20px'>Type:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'}   height='20px'>{petInfoContext.type}</Box>
                        <Box color={useColorModeValue('yellow.600', 'palegoldenrod')} fontWeight={'bold'} height='20px'>Breed:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.breed}</Box>
                        <Box color={useColorModeValue('yellow.600', 'palegoldenrod')} fontWeight={'bold'} height='20px'>Name:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.name}</Box>
                        <Box color={useColorModeValue('yellow.600', 'palegoldenrod')} fontWeight={'bold'} height='20px'>Age:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.age.years} years, {petInfoContext.age.months} months</Box>
                        <Box color={useColorModeValue('yellow.600', 'palegoldenrod')} fontWeight={'bold'} height='20px'>Location:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.location.city}, {petInfoContext.location.zipCode}</Box>
                        <Box color={useColorModeValue('yellow.600', 'palegoldenrod')} fontWeight={'bold'} height='20px'>Premium(to pay):</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{premiumEth} eth</Box>
                        <Box color={useColorModeValue('yellow.600', 'palegoldenrod')} fontWeight={'bold'} height='20px'>Premium(in Aud $ equal):</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>$ {premium}</Box>
                        <AbsoluteCenter alignContent={'center'}>
                            <Image alignItems={'center'}  borderRadius='full' boxSize='60px' src={petInfoContext.image}/>
                        </AbsoluteCenter>
                    </SimpleGrid>
                    <br/>
                    <Flex justifyContent="center" alignItems="center" >
                        { contract ? (
                        <Button onClick={payCreatePolicy} isLoading={loadState} loadingText={loadText} m='auto' colorScheme='blue'
                                variant="solid" _hover={{ bg: 'blue.300' }}>Pay</Button>
                        ) : (
                            <>Contract not found on this network!</>  
                        )}
                    </Flex>
                    </>
                )
            ):(
            <Text>Error: No Pet Info Available</Text>
            )}

            {!isWalletConnected && <Text fontSize={15} fontWeight={'bold'}>Connect your wallet and try again</Text>}
            </Box>
        </Container>
    }
    </>
  )
}

export default PolicyPayment