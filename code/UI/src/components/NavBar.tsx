import { Box, HStack, Image, Stack } from '@chakra-ui/react'
import logo from "@/assets/logo.webp"
import ColorModeSwitch from './ColorModeSwitch'
import SubNavBar from './SubNavBar'
import ButtonConnect from './ButtonConnect'

interface PageProps{
    currentPage : string
}
const NavBar = ({currentPage}:PageProps) => {
    return (
        <HStack justify='space-between' padding='10px'>
            <Box display={{ base: 'None', md: 'flex'}} alignItems='center' >
                <Image src={logo} borderRadius='full' boxSize='25px' />
                <Stack direction={['row', 'column']} spacing='0.1' align={''}>
                    <Box  fontSize='smaller' fontWeight='bold' as='i' color='orange.500'>
                        EtherInsure
                    </Box>
                    <Box  fontSize={'xs'} fontWeight='normal' as='i' color='orange.500' pl={1}>
                       (A Pet Insurance Company)
                    </Box>
                </Stack>
            </Box>
            <Box display='flex' justifyContent="space-between" gap={15}>
                <SubNavBar currentPage={currentPage}/>
                <ButtonConnect/>
                <ColorModeSwitch />
            </Box>
        </HStack >
    )
}

export default NavBar