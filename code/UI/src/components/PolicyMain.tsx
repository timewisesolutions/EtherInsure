
import { Box,Flex, Button, Container, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react'

const PolicyMain = () => {
    return(
        <>
        <Flex as="main" role="main" direction="column" flex="1" py={{ base: "16", lg: "10" }}>
          <Container flex="1">
              <Box as="section" bg="bg-surface" py={{ base: '16', md: '24' }} minH='md'>
                  <Container>
                      <Stack spacing={{ base: '8', md: '10' }}>
                          <Stack spacing={{ base: '4', md: '6' }}>
                              <Stack spacing="3">
                                  <Heading m='auto' size={useBreakpointValue({ base: 'md', md: 'lg' })} fontWeight="semibold">
                                      Get Your Pet Insured Now
                                  </Heading>
                              </Stack>
                          </Stack>
                          <Stack direction={{ base: 'column-reverse', md: 'row' }}>
                              <Button m='auto' colorScheme='blue' variant="solid" size='lg' width='100px' _hover={{ bg: 'blue.300' }}>
                                  Add
                              </Button>
                          </Stack>
                      </Stack>
                  </Container>
              </Box>
          </Container>
        </Flex>
        </>
  )
}

export default PolicyMain