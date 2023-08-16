
import { Box,Flex, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import PolicyForm from './PolicyForm'
import { useState } from 'react'
import PolicyPayment from './PolicyPayment';
import {PetInfoContext, PetInfoContextValue } from "@/context/PetInfoContext"

const PolicyMain = () => {
    const [isPolicyFormVisible, setIsPolicyFormVisible] = useState(false);
    const [isPolicyPaymentVisible, setIsPolicyPaymentVisible] = useState(false);
    const [petInfo, setPetInfo] = useState<PetInfoContextValue | undefined>(undefined);

    const handleAddPolicy = () => {
        setIsPolicyFormVisible(true)
    };

    const handlePolicyPaymentVisible = (petInfo:PetInfoContextValue) =>{
        setIsPolicyPaymentVisible(true)
        setPetInfo(petInfo)
    }

    return (
        <>
        <PetInfoContext.Provider value={petInfo}>
            {isPolicyFormVisible ?(
                <div><PolicyForm 
                        onClearPolicyFormVisible={()=>setIsPolicyFormVisible(false)}
                        onSetPolicyPayment={handlePolicyPaymentVisible}/>
                </div>
                ) :
            isPolicyPaymentVisible ? (
                    <div><PolicyPayment/></div>
                ) :
                (
                    <Flex as="main" role="main" direction="column" flex="1" py={{ base: "16", lg: "10" }}>
                        <Container flex="1">
                            <Box as="section" bg="bg-surface" py={{ base: '16', md: '24' }} minH='md'>
                                <Text fontSize={'larger'} fontWeight={'bold'} m={'auto'} align={'center'}>
                                        Get Your Pet Insured Now
                                </Text>
                                <Stack direction={{ base: 'column-reverse', md: 'row' }} p={2}>
                                    <Button m='auto' colorScheme='blue'
                                        variant="solid" size='lg'
                                        width='100px' _hover={{ bg: 'blue.300' }}
                                        onClick={handleAddPolicy}
                                    >
                                        Add
                                    </Button>
                                </Stack>
                            </Box>
                        </Container>
                    </Flex>
            )}
        </PetInfoContext.Provider>
        </>
        );
};

export default PolicyMain