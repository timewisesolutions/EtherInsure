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
} from '@chakra-ui/react'
import pets from '@/assets/pets.jpg'

const PetCard =() => {
    return (
        <Container maxW={'5xl'} py={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} >
                <Stack spacing={4}>
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        Our Story
                    </Text>

                    <Text as ='b' fontFamily={'cursive'}>Why you need Pet Insurance?</Text>

                    <Text color={'gray.500'} fontSize={'sm'}>
                        Pets are our furry, cuddly companions that bring us joy and love.
                        Owning a pet is a big responsibility, but it is also incredibly rewarding.
                    </Text>

                    <Stack
                        spacing={4}
                        divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
                        }>
                        <UnorderedList fontSize={'sm'} fontFamily='sans-serif'  color={useColorModeValue('yellow.800','yellow.200')}>
                            <ListItem>Protect your pet from unexpected medical expenses that can be financially devastating</ListItem>
                            <ListItem>Pet insurance can give you peace of mind knowing that you are financially protected if your pet needs expensive medical care</ListItem>
                            <ListItem>Avoid the difficult decision to put your pet down due to unaffordable veterinary bills</ListItem>
                            <ListItem>Enjoy peace of mind knowing your furry friend is protected against unforeseen health issues</ListItem>
                        </UnorderedList>
                    </Stack>
                </Stack>
                <Flex p = {5} alignItems={'end'}>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={pets}
                        fit = 'initial'
                        height={200}
                    />
                </Flex>
            </SimpleGrid>
        </Container>
  )
}
export default PetCard