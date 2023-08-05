import { Box, HStack, Image, Text } from '@chakra-ui/react'
import logo from "@/assets/logo.webp"
import ColorModeSwitch from './ColorModeSwitch'
import SubNavBar from './SubNavBar'
import ButtonConnect from './ButtonConnect'

const NavBar = () => {
    return (
        <HStack justify='space-between' padding='10px'>
            <Box display={{ base: 'None', md: 'flex' }} alignItems='baseline'>
                <Image src={logo} borderRadius='full' boxSize='50px' />
                <Text fontSize='md' fontWeight='bold' as='i' color='orange.500'>EtherInsure </Text>
                <Text fontSize='xs' fontWeight='bold' as='i' color='orange.500' p='1'>(A Pet Insurance Company) </Text>
            </Box>
            <Box display='flex' alignItems='baseline' justifyContent="space-between" gap={10}>
                <SubNavBar />
                <ButtonConnect/>
                <ColorModeSwitch />
            </Box>
        </HStack >
    )
}

export default NavBar