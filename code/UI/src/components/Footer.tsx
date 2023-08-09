import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  return (
    <>
        <Box
            alignItems={'center'}
            flexDirection={'column'}
            borderRadius='md'
            background="#38383d"
            mx={10}
            mb={2}
            rounded={'md'}
        >
            <Text as='h2' fontSize={18} fontWeight={'semibold'} textAlign='center' color={useColorModeValue('green.300', 'green.400')}>
            Contact Us
            </Text>
            <Flex  flexDir={{base:'column', md:'row'}} justify={'space-between'} py={2} px={10} >
                <Text fontSize={{ base: '10px', md: '13px', lg: '16px' }} as='b'color={'linkedin.500'}>Email: contact@contact.com</Text>
                <Text fontSize={{ base: '10px', md: '13px', lg: '16px' }} as='b'color={'linkedin.500'}>Phone: +61 1234567</Text>
            </Flex>
        </Box>
   </>
  )
}

export default Footer