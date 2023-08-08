import { Box, Flex, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <>
        <Box
            justifySelf={'center'}
            alignItems={'center'}
            flexDirection={'column'}
        >
            <Text as='h2' fontSize={18} fontWeight={'semibold'} textAlign='center'>
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