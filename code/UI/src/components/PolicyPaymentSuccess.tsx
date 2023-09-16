import { PetInfoContext, PetPolicyDetails } from "@/context/PetInfoContext";
import { get_policy_details } from "@/services/blockchain/Blockchain";
import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useContext, useEffect, useState } from "react";

interface Props {
  policyNo: number;
}

const PolicyPaymentSuccess = ({ policyNo }: Props) => {
  const petInfoContext = useContext(PetInfoContext);
  const [petPolicyDetails, setPetPolicyDetails] = useState<PetPolicyDetails>({
    policyHolder: "",
    petIpfsLink: "",
    createdTime: "",
    endTime: "",
    policyNumber: 0,
    max_amount_insured: 0,
  });
  let petPremiumPaid;
  const handleGetPolicyDetails = async () => {
    const result = await get_policy_details(policyNo);
    setPetPolicyDetails({
      policyHolder: result.policy_details[0],
      petIpfsLink: result.policy_details[1],
      // convert time to UTC
      createdTime: convertTimeToUTC(result.policy_details[2]),
      endTime: convertTimeToUTC(result.policy_details[3]),
      policyNumber: result.policy_details[4].toNumber(),
      max_amount_insured: result.policy_details[5].toNumber(),
    });
    petPremiumPaid = result.premium_paid;
  };

  const convertTimeToUTC = (intime: BigNumber) => {
    let t = intime.toNumber();
    let formattedDate = new Date(t * 1000);
    return formattedDate.toUTCString();
  };

  useEffect(() => {
    handleGetPolicyDetails();
  }, [petInfoContext]);

  return (
    <>
      {petInfoContext ? (
        <Container flex="1">
          <Box
            as="section"
            bg="bg-surface"
            my={{ base: "0", md: "1" }}
            minH="lg"
          >
            <Text
              fontWeight={"semibold"}
              fontFamily={"mono"}
              color={"aqua"}
              fontSize={20}
              textAlign="center"
            >
              Your Policy Details:
            </Text>
            <br />
            <SimpleGrid
              textAlign={"center"}
              columns={2}
              spacingX="20px"
              spacingY="10px"
            >
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Policy Number:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petPolicyDetails.policyNumber}
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Policy Amount Insured:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petPolicyDetails.max_amount_insured} Aud($)
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Policy Start:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petPolicyDetails.createdTime}
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Policy End:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petPolicyDetails.endTime}
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Policy Holder:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >{`${petPolicyDetails.policyHolder.slice(
                0,
                6
              )}...${petPolicyDetails.policyHolder.slice(-4)}`}</Box>

              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Type:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petInfoContext.type}
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Breed:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petInfoContext.breed}
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Name:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petInfoContext.name}
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Age:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petInfoContext.age.years} years, {petInfoContext.age.months}{" "}
                months
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                Location:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petInfoContext.location.city},{" "}
                {petInfoContext.location.zipCode}
              </Box>
              <Box
                color={useColorModeValue("yellow.600", "palegoldenrod")}
                fontWeight={"bold"}
                height="20px"
              >
                PreMedical Condition:
              </Box>
              <Box
                fontStyle={"italic"}
                fontFamily={"cursive"}
                fontWeight={"semibold"}
                height="20px"
              >
                {petInfoContext.preMedicalCondition}
              </Box>
            </SimpleGrid>
            <br />
          </Box>
        </Container>
      ) : (
        <>Error: No Pet Info Available</>
      )}
    </>
  );
};

export default PolicyPaymentSuccess;
