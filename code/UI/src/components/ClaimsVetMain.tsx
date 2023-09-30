import {
  Box,
  Container,
  Flex,
  Input,
  Select,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { vet_names, vet_emails } from "@/config/user_config";
import { useState } from "react";
import {
  confirmTransaction,
  instantiateMultiSigWalletContract,
} from "@/services/blockchain/Blockchain";
import EmailContactForm2 from "./EmailContactForm2";

interface Props {
  clearVetClaims: () => void;
}
export interface VetPetApprovalInfo {
  vetName: string;
  policyNumber: number;
  claimNo: number;
}
const ClaimsVetMain = ({ clearVetClaims }: Props) => {
  const [sendEmail, setSendEmail] = useState(false);
  const [loadState, setLoadState] = useState(false);
  const [vetPetApprovalInfo, setVetPetApprovalInfo] =
    useState<VetPetApprovalInfo>({
      vetName: "",
      policyNumber: 0,
      claimNo: -1,
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VetPetApprovalInfo>();
  const handleVetName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    vetPetApprovalInfo.vetName = event.target.value;
  };
  const confirmTx_eventCallback = async (result: boolean) => {
    console.log("confirmTx callback:", result);
    setSendEmail(true);
    setLoadState(false);
  };
  const onSubmit = async (data: VetPetApprovalInfo) => {
    setLoadState(true);
    vetPetApprovalInfo.policyNumber = data.policyNumber;
    vetPetApprovalInfo.claimNo = data.claimNo;

    // now call multisigwallet confirm transaction for the given claim no
    let res = await instantiateMultiSigWalletContract();
    if (res === true) {
      await confirmTransaction(
        vetPetApprovalInfo.claimNo,
        confirmTx_eventCallback
      );
    }
  };
  return sendEmail ? (
    <EmailContactForm2
      vet_approval_info={vetPetApprovalInfo}
      clearVetClaims={clearVetClaims}
    />
  ) : (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py={{ base: "16", md: "10" }}
    >
      <Container flex="1">
        <Box
          as="section"
          bg="bg-surface"
          py={{ base: "16", md: "20" }}
          minH="md"
        >
          <Text
            fontSize={"larger"}
            fontWeight={"bold"}
            m={"auto"}
            align={"center"}
          >
            Approve Claims
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
                Policy Number
              </Text>
              <Input
                placeholder="policy number"
                maxWidth={"230px"}
                size={"sm"}
                rounded={"md"}
                {...register("policyNumber", {
                  required: true,
                  pattern: /^[0-9]+$/i,
                })}
              />
              {errors.policyNumber?.type === "pattern" && (
                <Box color={"red"} fontSize={10}>
                  Policy Number must be numeric
                </Box>
              )}
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

              <Select
                isRequired
                placeholder="Dr."
                onChange={(e) => {
                  handleVetName(e);
                }}
                py={1}
                size={"xs"}
                rounded={"md"}
                fontWeight={"bold"}
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
                maxWidth={"230px"}
              >
                <option>{vet_names[0]}</option>
                <option>{vet_names[1]}</option>
                <option>{vet_names[2]}</option>
                <option>{vet_names[3]}</option>
                <option>{vet_names[4]}</option>
              </Select>
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

export default ClaimsVetMain;
