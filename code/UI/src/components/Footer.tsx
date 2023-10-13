import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Box
        alignItems={"center"}
        flexDirection={"column"}
        borderRadius="md"
        background="#38383d"
        mx={3}
        mb={{ base: 0.2, md: 2, lg: 2 }}
        rounded={"md"}
      >
        <Text
          as="h2"
          fontSize={{ base: 8, md: 14, lg: 14 }}
          fontWeight={"semibold"}
          textAlign="center"
          color={useColorModeValue("green.300", "green.400")}
        >
          Contact Us
        </Text>

        <SimpleGrid
          columns={2}
          spacingX={{ base: "5", md: "96", lg: "96" }}
          spacingY="2px"
          mx={"1"}
        >
          <Box
            color={"linkedin.500"}
            fontSize={{ base: "6", md: "x-small", lg: "smaller" }}
            fontWeight={{ base: "x-small", md: "semibold", lg: "semibold" }}
            overflow={"hidden"}
          >
            Email: support@timewisesolutions.com.au
          </Box>
          <Box
            color={"linkedin.500"}
            fontSize={{ base: "6", md: "x-small", lg: "smaller" }}
            fontWeight={{ base: "x-small", md: "semibold", lg: "semibold" }}
          >
            Phone: +61 403663145
          </Box>
          <Box
            color={"linkedin.500"}
            fontSize={{ base: "6", md: "x-small", lg: "smaller" }}
            fontWeight={{ base: "x-small", md: "semibold", lg: "semibold" }}
          >
            ACN: 670575774
          </Box>
          <Box
            color={"linkedin.500"}
            fontSize={{ base: "6", md: "x-small", lg: "smaller" }}
            fontWeight={{ base: "x-small", md: "semibold", lg: "semibold" }}
          >
            ABN: 93670575774
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Footer;
