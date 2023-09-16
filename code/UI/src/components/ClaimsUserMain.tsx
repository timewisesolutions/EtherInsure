import { instantiateContract } from "@/services/blockchain/Blockchain";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface Props {
  clearUserClaims: () => void;
}
type FormValues = {
  policyNumber: number;
};
const ClaimsUserMain = ({ clearUserClaims }: Props) => {
  const [petType, setPetType] = useState("");
  const [loadState, setLoadState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const handlePetType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPetType(event.target.value);
  };
  const onSubmit = (data: FormValues) => {
    console.log(data.policyNumber);
    setLoadState(true);
  };
  useEffect(() => {
    async function createContract() {
      const result = await instantiateContract(petType);
      if (result === true) {
      }
    }
    createContract();
  }, []);

  return (
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
                Submit
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
