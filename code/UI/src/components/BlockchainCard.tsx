import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
  UnorderedList,
  ListItem,
  Box,
} from '@chakra-ui/react'
import blockchain from '@/assets/blockchain.jpg'

const BlockchainCard = () => {
  return (
        <Container maxW={'5xl'} py={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} >
                <Stack spacing={4}>
                    <Text as ='b' fontFamily={'cursive'}>Why we use Blockchain</Text>
                    <Flex p = {5} alignItems={'end'}>
                        <Image
                            rounded={'md'}
                            alt={'feature image'}
                            src={blockchain}
                            fit = 'initial'
                            height={180}
                        />
                    </Flex>
                </Stack>
                <Flex>
                    <Stack>
                        <UnorderedList  fontSize={'sm'} fontFamily='sans-serif' color={useColorModeValue('blue.700','blue.200')}>
                            <ListItem>
                                <Text fontWeight="bold"> Security:</Text>Blockchain technology provides a secure way to store and transfer data, as it uses advanced cryptography and a decentralized network
                            </ListItem>
                            <ListItem>
                                <Text fontWeight="bold"> Transparency:</Text>Blockchain technology allows for transparency in transactions and data management
                            </ListItem>
                            <ListItem>
                                <Text fontWeight="bold"> Immutable:</Text>The blockchain is immutable, ensuring that the data is tamper-proof
                            </ListItem>
                            <ListItem>
                                <Text fontWeight="bold"> Validation:</Text>Blockchain technology relies on a validation process, where multiple parties work together to form a consensus. This ensures that the data stored on the blockchain is reliable and trustworthy
                            </ListItem>
                        </UnorderedList>
                        </Stack>
                </Flex>
            </SimpleGrid>
        </Container>

  )
}

export default BlockchainCard