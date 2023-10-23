import {
  getPetTypeDeployedAddress,
  get_policy_exists_from_policy_number,
  instantiateMultiSigWalletContract,
  instantiatePetContract,
  submitTx,
} from "@/services/blockchain/Blockchain";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Select,
  Text,
  Toast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { vet_names, vet_emails } from "@/config/user_config";
import { useToast } from "@chakra-ui/react";
import EmailContactForm from "./EmailContactForm";

interface Props {
  clearUserClaims: () => void;
}
export interface ClaimPetInfo {
  petType: string;
  vetName: string;
  policyNumber: number;
  claimAmount: number;
  claimNo: number;
}

const ClaimsUserMain = ({ clearUserClaims }: Props) => {
  const [loadState, setLoadState] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [claimPetInfo, setClaimPetInfo] = useState<ClaimPetInfo>({
    petType: "",
    vetName: "",
    policyNumber: 0,
    claimAmount: 0,
    claimNo: -1,
  });

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimPetInfo>();
  const handlePetType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    claimPetInfo.petType = event.target.value;
  };
  const handleVetName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    claimPetInfo.vetName = event.target.value;
  };
  const submitTx_eventCallback = async (claimNo: number) => {
    claimPetInfo.claimNo = claimNo;
    setLoadState(false);
    setSendEmail(true);
  };
  const onSubmit = async (data: ClaimPetInfo) => {
    claimPetInfo.claimAmount = data.claimAmount;
    claimPetInfo.policyNumber = data.policyNumber;
    setLoadState(true);
    let res = await instantiatePetContract(claimPetInfo.petType);
    if (res === true) {
      let { tx, error } = await get_policy_exists_from_policy_number(
        claimPetInfo.policyNumber
      );
      if (tx === true) {
        // Policy exists, now send email to the vet to sign the claim
        const policyAddressAndAbi = await getPetTypeDeployedAddress(
          claimPetInfo.petType
        );
        const policyAddress = policyAddressAndAbi?.policyAddress;
        if (policyAddress) {
          // call submit Tx in multisig contract with dog/cat policy, amount and policy no
          let res = await instantiateMultiSigWalletContract();
          if (res === true) {
            await submitTx(
              policyAddress,
              claimPetInfo.policyNumber,
              claimPetInfo.claimAmount,
              submitTx_eventCallback
            );
          }
        }
      } else {
        // There is an error in transaction, handle it
        if (error === "You dont have any policy") {
          toast({
            title: "No policy found for this policy number!",
            status: "error",
            position: "top",
          });
        } else if (error === "Policy premium not paid") {
          toast({
            title: "Policy premium not paid!",
            status: "error",
            position: "top",
          });
        } else if (error === "Policy expired") {
          toast({
            title: "Policy expired!",
            status: "error",
            position: "top",
          });
        }
        clearUserClaims();
        setLoadState(false);
      }
    }
  };

  return sendEmail ? (
    <EmailContactForm
      claim_info={claimPetInfo}
      clearUserClaims={clearUserClaims}
    />
  ) : (
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
            Claim your Pet Insurance Now
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
                Claim Amount (Aud $)
              </Text>
              <Input
                placeholder="claim amount"
                maxWidth={"230px"}
                size={"sm"}
                rounded={"md"}
                {...register("claimAmount", {
                  required: true,
                  pattern: /^[0-9]+$/i,
                })}
              />
              {errors.claimAmount?.type === "pattern" && (
                <Box color={"red"} fontSize={10}>
                  Amount must be numeric
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

              <Select
                isRequired
                placeholder="Type"
                onChange={(e) => {
                  handlePetType(e);
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
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
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
                Continue
              </Button>

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
                onClick={clearUserClaims}
              >
                Back
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Flex>
  );
};

export default ClaimsUserMain;
