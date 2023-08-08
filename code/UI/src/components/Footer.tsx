import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  return (
    <>
        <Box
            position="sticky"
            bottom="0"
            alignItems={'center'}
            flexDirection={'column'}
            borderRadius='md'
            background="#38383d"
            mx={10}
            rounded={'md'}
        >
            <Text as='h2' fontSize={18} fontWeight={'semibold'} textAlign='center' color={useColorModeValue('green.300', 'green.400')}>
            Contact Us
            </Text>
            <Flex justifyContent={'space-between'} px={10} py={2}>
                <Text as='b' color={'linkedin.500'}>Email: contact@contact.com</Text>
                <Text as='b'color={'linkedin.500'}>Phone: +61 1234567</Text>
            </Flex>
        </Box>
   </>
  )
}

export default Footer