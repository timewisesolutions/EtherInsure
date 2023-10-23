import {
  useToast,
  Box,
  Button,
  Container,
  Flex,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PetInfoContextValue } from "@/context/PetInfoContext";

// 1920 x 1080
interface IFormInput {
  breed: string;
  name: string;
  ageYears: number;
  ageMonths: number;
  location: string;
  zip: string;
  image: string;
}

interface Props {
  onClearPolicyFormVisible: () => void;
  onSetPolicyPayment: (petInfo: PetInfoContextValue) => void;
}

const PolicyForm = ({
  onClearPolicyFormVisible,
  onSetPolicyPayment,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const [petType, setPetType] = useState("");
  const [petPreMedicalCond, setPreMedicalCond] = useState("");
  const [imagepreview, setImagePreview] = useState("");
  const toast = useToast();

  const handlePetType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPetType(event.target.value);
  };

  const handlePreMedicalCond = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPreMedicalCond(event.target.value);
  };

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      const urlImage = URL.createObjectURL(file);
      setImagePreview(urlImage);
    }
  };

  const onSubmit = (data: IFormInput) => {
    const newPetInfo: PetInfoContextValue = {
      type: petType,
      breed: data["breed"],
      name: data["name"],
      age: {
        years: data["ageYears"],
        months: data["ageMonths"],
      },
      location: {
        city: data["location"],
        zipCode: data["zip"],
      },
      preMedicalCondition: petPreMedicalCond,
      image: imagepreview,
    };
    // clear input form
    reset();
    setPetType("");
    setPreMedicalCond("");
    // Check PreMed Condition exists, then we move back to Policy Page
    onClearPolicyFormVisible();
    if (newPetInfo.preMedicalCondition === "Yes") {
      toast({
        title:
          "Sorry! We dont have Insurance for pets with Pre-Medical condition.",
        status: "error",
        position: "top",
      });
      return;
    }
    // Now handle payment (in payment component) and only later after payment success
    // send data to IPFS and then update the screen with
    // the new policy created for the user with Policy details
    onSetPolicyPayment(newPetInfo);
  };

  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py={{ base: "2", lg: "5" }}
      minH="100vh"
    >
      <Container flex="1">
        <Box as="section" bg="bg-surface" py={{ base: "5", md: "8" }}>
          <Text fontSize={"larger"} fontWeight={"bold"} align={"center"}>
            {" "}
            Enter the Pet Details
          </Text>
          <VStack align={""}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Select
                value={petType}
                isRequired
                onChange={(e) => {
                  handlePetType(e);
                }}
                placeholder="Type"
                py={1}
                size={"sm"}
                rounded={"md"}
                fontWeight={"bold"}
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </Select>

              <Text
                as="b"
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
              >
                Breed
              </Text>
              <Input
                placeholder="breed"
                size={"sm"}
                rounded={"md"}
                {...register("breed", {
                  required: true,
                  maxLength: 50,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {errors?.breed?.type === "required" && (
                <p>This field is required</p>
              )}
              {errors?.breed?.type === "maxLength" && (
                <p>First name cannot exceed 50 characters</p>
              )}
              {errors?.breed?.type === "pattern" && (
                <p>Alphabetical characters only</p>
              )}
              <br />
              <Text
                as="b"
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
              >
                Name
              </Text>
              <Input
                placeholder="name"
                size={"sm"}
                rounded={"md"}
                {...register("name", { pattern: /^[A-Za-z]+$/i })}
              />
              {errors?.name?.type === "pattern" && (
                <p>Alphabetical characters only</p>
              )}
              <br />
              <Text
                as="b"
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
              >
                Age(Years)
              </Text>
              <Input
                placeholder="years"
                size={"sm"}
                rounded={"md"}
                {...register("ageYears", { required: true, min: 1, max: 11 })}
              />
              {errors.ageYears && (
                <p>You Pet must not be more than 12 years old</p>
              )}
              <br />
              <Text
                as="b"
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
              >
                Age(Months)
              </Text>
              <Input
                placeholder="months"
                size={"sm"}
                rounded={"md"}
                {...register("ageMonths", { required: true, min: 0, max: 11 })}
              />
              {errors.ageMonths && <p>Months should be less than 11</p>}
              <br />
              <Text
                as="b"
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
              >
                Location
              </Text>
              <Input
                placeholder="city"
                size={"sm"}
                rounded={"md"}
                {...register("location", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {errors.location?.type === "pattern" && (
                <p>City name must be Alphabetical </p>
              )}
              <br />
              <Text
                as="b"
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
              >
                Zip
              </Text>
              <Input
                placeholder="zip"
                size={"sm"}
                rounded={"md"}
                {...register("zip", { required: true, pattern: /^[0-9]+$/i })}
              />
              {errors.zip?.type === "pattern" && (
                <p>Zip code must be numeric</p>
              )}
              <Text
                as="b"
                fontSize={14}
                fontFamily={"fantasy"}
                fontStyle={"italic"}
              >
                Pet Image
              </Text>
              <Input
                type="file"
                placeholder="image"
                size={"sm"}
                rounded={"md"}
                {...register("image", {
                  required: true,
                })}
                onChange={(e) => onImageUpload(e)}
              />
              {errors?.image?.type === "required"}
              <br />
              <Select
                value={petPreMedicalCond}
                isRequired
                onChange={(e) => {
                  handlePreMedicalCond(e);
                }}
                placeholder="Medical history"
                size={"sm"}
                rounded={"md"}
                fontWeight={"bold"}
                py={1}
                fontSize={14}
                fontStyle={"italic"}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              <br />
              <Button
                mt={3}
                borderRadius="md"
                bg="cyan.600"
                _hover={{ bg: "cyan.200" }}
                variant="ghost"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};
export default PolicyForm;
