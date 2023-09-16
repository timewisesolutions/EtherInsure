import { Button, Center, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";
import ClaimsUserMain from "./ClaimsUserMain";
import ClaimsVetMain from "./ClaimsVetMain";

const ClaimsMain = () => {
  const [userClaim, setUserClaim] = useState(false);
  const [vet, setVet] = useState(false);
  const vetClaims = () => {
    setVet(true);
  };

  const userClaims = () => {
    setUserClaim(true);
  };
  const clearUserClaims = () => {
    setUserClaim(false);
  };
  return userClaim ? (
    <ClaimsUserMain clearUserClaims={clearUserClaims} />
  ) : vet ? (
    <ClaimsVetMain />
  ) : (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py={{ base: "16", md: "5" }}
    >
      <Center flex="1">
        <HStack as="section" bg="bg-surface" minH="md" gap={"40"}>
          <Button
            size={"lg"}
            borderRadius="md"
            bg="cyan.600"
            _hover={{ bg: "cyan.200" }}
            variant="ghost"
            type="submit"
            onClick={vetClaims}
          >
            Vet View
          </Button>
          <Button
            size={"lg"}
            borderRadius="md"
            bg="cyan.600"
            _hover={{ bg: "cyan.200" }}
            variant="ghost"
            type="submit"
            onClick={userClaims}
          >
            User View
          </Button>
        </HStack>
      </Center>
    </Flex>
  );
};

export default ClaimsMain;
