import { PetInfoContext, PetPolicyDetails } from '@/context/PetInfoContext';
import { get_policy_details } from '@/services/blockchain/Blockchain';
import { Box, Container, SimpleGrid,Text } from '@chakra-ui/react'
import { useAddress} from '@thirdweb-dev/react';
import { useContext, useEffect, useState } from 'react'

interface Props {
    policyNo: number
}

const PolicyPaymentSuccess = ({ policyNo }:Props) => {

    const petInfoContext = useContext(PetInfoContext)
    const [petPolicyDetails, setPetPolicyDetails] = useState<PetPolicyDetails>({
        policyHolder: '',
        petIpfsLink: '',
        createdTime: 0,
        endTime: 0,
        policyNumber: 0,
        max_amount_insured: 0
    })
    let petPremiumPaid
    const handleGetPolicyDetails = async () => {
        const result = await get_policy_details(policyNo)
        setPetPolicyDetails({
            policyHolder       : result.policy_details[0],
            petIpfsLink        : result.policy_details[1],
            createdTime        : result.policy_details[2].toNumber(),
            endTime            : result.policy_details[3].toNumber(),
            policyNumber       : result.policy_details[4].toNumber(),
            max_amount_insured : result.policy_details[5].toNumber()
        })
        petPremiumPaid                      = result.premium_paid
    }

    useEffect(() => {
        handleGetPolicyDetails();
    }, [petInfoContext]);

    return (
    <>
    {petInfoContext? (
        <Container flex="1">
            <Box as="section" bg="bg-surface" py={{ base: '12', md: '2' }} minH='sm'>
                <Text fontWeight={'semibold'} fontFamily={'mono'} color={'aqua'} fontSize={20}  textAlign="center">Your Policy Details:</Text>
                <br/>
                    <SimpleGrid textAlign={'center'} columns={2} spacingX='20px' spacingY='10px' >
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Policy Number:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'}   height='20px'>{petPolicyDetails.policyNumber}</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Policy Amount Insured:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'}   height='20px'>{petPolicyDetails.max_amount_insured} Aud($)</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Policy Start:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'}   height='20px'>{petPolicyDetails.createdTime}</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Policy End:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'}   height='20px'>{petPolicyDetails.endTime}</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Policy Holder:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'}   height='20px'>{`${petPolicyDetails.policyHolder.slice(0, 6)}...${petPolicyDetails.policyHolder.slice(-4)}`}</Box>

                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Type:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'}   height='20px'>{petInfoContext.type}</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Breed:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.breed}</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Name:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.name}</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Age:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.age.years} years, {petInfoContext.age.months} months</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>Location:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.location.city}, {petInfoContext.location.zipCode}</Box>
                        <Box color={'palegoldenrod'} fontWeight={'bold'} height='20px'>PreMedical Condition:</Box>
                        <Box fontStyle={'italic'} fontFamily={'cursive'} fontWeight={'semibold'} height='20px'>{petInfoContext.preMedicalCondition}</Box>

                    </SimpleGrid>
                    <br/>
            </Box>
        </Container>
    ):(<>Error: No Pet Info Available</>)
    }
    </>
  )
}

export default PolicyPaymentSuccess