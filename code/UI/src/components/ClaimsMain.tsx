import { Button, Center, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";
import ClaimsUserMain from "./ClaimsUserMain";
import ClaimsVetMain from "./ClaimsVetMain";
import Signer, { signer } from "@/components/Signer";
import ClaimsCompanyMain from "./ClaimsCompanyMain";

const ClaimsMain = () => {
  const [userClaim, setUserClaim] = useState(false);
  const [vetClaim, setVetClaim] = useState(false);
  const [companyClaim, setCompanyClaim] = useState(false);
  const [first, setfirst] = useState(signer);

  const userClaims = () => {
    setUserClaim(true);
  };

  const clearUserClaims = () => {
    setUserClaim(false);
  };

  const vetClaims = () => {
    setVetClaim(true);
  };
  const clearVetClaims = () => {
    setVetClaim(false);
  };
  const companyClaims = () => {
    setCompanyClaim(true);
  };
  const clearCompanyClaims = () => {
    setCompanyClaim(false);
  };
  return (
    <>
      {userClaim ? (
        <ClaimsUserMain clearUserClaims={clearUserClaims} />
      ) : vetClaim ? (
        <ClaimsVetMain clearVetClaims={clearVetClaims} />
      ) : companyClaim ? (
        <ClaimsCompanyMain clearCompanyClaims={clearCompanyClaims} />
      ) : (
        <>
          <Signer />
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
                <Button
                  size={"lg"}
                  borderRadius="md"
                  bg="cyan.600"
                  _hover={{ bg: "cyan.200" }}
                  variant="ghost"
                  type="submit"
                  onClick={companyClaims}
                >
                  Company View
                </Button>
              </HStack>
            </Center>
          </Flex>
        </>
      )}
    </>
  );
};

export default ClaimsMain;
