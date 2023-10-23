import {
  Container,
  Flex,
  Text,
  Input,
  Box,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BigNumber } from "ethers";
import { useState } from "react";
import {
  executeTx,
  instantiateMultiSigWalletContract,
} from "@/services/blockchain/Blockchain";

interface Props {
  clearCompanyClaims: () => void;
}
export interface CompanyPetClaimApprovals {
  claimNo: number;
}
const ClaimsCompanyMain = ({ clearCompanyClaims }: Props) => {
  const [loadState, setLoadState] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyPetClaimApprovals>();

  const executeTx_eventCallback = async (claimTime: BigNumber) => {
    toast({
      title: "Claim Execution Success!",
      status: "success",
      position: "top",
    });
    setLoadState(false);
    clearCompanyClaims();
  };
  const onSubmit = async (data: any) => {
    setLoadState(true);
    let res = await instantiateMultiSigWalletContract();
    if (res === true) {
      await executeTx(data.claimNo, executeTx_eventCallback);
    }
  };

  const convertTimeToUTC = (intime: BigNumber) => {
    let t = intime.toNumber();
    let formattedDate = new Date(t * 1000);
    return formattedDate.toUTCString();
  };
  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py={{ base: "16", md: "10" }}
      minH="100vh"
    >
      <Container flex="1">
        <Box as="section" bg="bg-surface" py={{ base: "16", md: "20" }}>
          <Text
            fontSize={"larger"}
            fontWeight={"bold"}
            m={"auto"}
            align={"center"}
          >
            Execute Claims
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack
              direction={{ base: "column-reverse", md: "column" }}
              p={2}
              align={"center"}
            >
              <Text
                fontSize={12}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
                fontWeight={"bold"}
              >
                Claim Number
              </Text>
              <Input
                placeholder="claim number"
                maxWidth={"230px"}
                size={"sm"}
                rounded={"md"}
                {...register("claimNo", {
                  required: true,
                  pattern: /^[0-9]+$/i,
                })}
              />
              {errors.claimNo?.type === "pattern" && (
                <Box color={"red"} fontSize={10}>
                  Claim Number must be numeric
                </Box>
              )}
              <Button
                mt={3}
                size={"sm"}
                borderRadius="md"
                bg="cyan.600"
                _hover={{ bg: "cyan.200" }}
                variant="ghost"
                type="submit"
                height="28px"
                width="100px"
                isLoading={loadState}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Flex>
  );
};

export default ClaimsCompanyMain;
