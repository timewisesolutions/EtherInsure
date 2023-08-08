import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'



interface Props {
    children: React.ReactNode
}

interface PageProps{
    currentPage : string
}

const Links = ['Home', 'Policy', 'Claims', 'Dashboard']


const NavLink = (props: Props) => {
    const { children } = props
    const navigate = useNavigate()

    const handlePageClick= (page:React.ReactNode) => {
        navigate(`/${page}`)
    }

    return (
        <Box
            as="a"
            px={2}
            py={1}
            fontWeight='semibold'
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            onClick={() => handlePageClick(children)}
            href={'#'}>
            {children}
        </Box>
    )
}

const SubNavBar = ({currentPage}: PageProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box bg={useColorModeValue('gray.300', 'gray')} px={4} rounded={10}>
                <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                currentPage === link ? (
                                   <Box key={link}>{link}</Box>
                                ) : (
                                <NavLink key={link}>{link}</NavLink>
                                )
                            ))}
                        </HStack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                currentPage === link ? (
                                   <Box key={link}>{link}</Box>
                                ) : (
                                <NavLink key={link}>{link}</NavLink>
                                )
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}

export default SubNavBar