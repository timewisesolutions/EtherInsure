
import {useToast, Box, Button, Container, Flex, Input, Select,Text, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { useForm} from "react-hook-form"


interface IFormInput {
    breed: string
    name: string
    ageYears: number
    ageMonths : number
    location: string
    zip : string
}

interface Props{
    onSetPolicyFormVisible : () => void;
}

const PolicyForm = ({onSetPolicyFormVisible}: Props) => {

    const petInfo = {
        Type: "",
        breed: "",
        name: "",
        age: {
            years: 0,
            months: 0,
        },
        location: {
            city: "",
            zipCode: "",
        },
        preMedicalCondition: "",
        image : ""
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IFormInput>();


    const [petType, setPetType] = useState("")
    const [petPreMedicalCond, setPreMedicalCond] = useState("")
    const toast = useToast()

    const handlePetType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPetType(event.target.value)
    }

    const handlePreMedicalCond = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPreMedicalCond(event.target.value)
    }

    const onSubmit = (data: IFormInput) => {
        petInfo.Type = petType
        petInfo.breed = data["breed"]
        petInfo.name = data["name"]
        petInfo.age.years = data["ageYears"]
        petInfo.age.months = data["ageMonths"]
        petInfo.location.city = data["location"]
        petInfo.location.zipCode = data["zip"]
        petInfo.preMedicalCondition = petPreMedicalCond
        console.log("after petInfo: ", petInfo)
        // clear input form
        reset()
        setPetType('')
        setPreMedicalCond('')
        // Check PreMed Condition exists, then we move back to Policy Page
        if(petInfo.preMedicalCondition === 'Yes'){
            toast({ title: "Sorry! No Insurance Possible for pets with Pre-Medical condition.", 
                    status: 'error',
                    position: 'top'

                })
            onSetPolicyFormVisible()
        }
        // Now handle how to send data to IPFS and then update the screen with 
        // the new policy created for the user
    };


    return (
        <Flex as="main" role="main" direction="column" flex="1" py={{ base: "2", lg: "5" }}>
            <Container flex="1">
                <Box as="section" bg="bg-surface" py={{ base: '5', md: '8' }} minH='md'>
                    <Text fontSize={'larger'} fontWeight={'bold'} align={'center'}> Enter the Pet Details</Text>
                <VStack align={''}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Select
                            value={petType}
                            isRequired
                            onChange={(e)=>{handlePetType(e)}}
                            placeholder="Type"
                            py={1}
                            fontSize={14}
                            fontStyle={'italic'}
                            >
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </Select>

                        <Text as='b' fontSize={14} fontFamily={'fantasy'} fontStyle={'italic'}>Breed</Text>
                        <Input
                            placeholder='breed'
                            {...register("breed", {
                            required: true,
                            maxLength: 50,
                            pattern: /^[A-Za-z]+$/i
                            })}
                        />
                            {errors?.breed?.type === "required" && <p>This field is required</p>}
                            {errors?.breed?.type === "maxLength" && (
                                <p>First name cannot exceed 50 characters</p>
                            )}
                            {errors?.breed?.type === "pattern" && (
                                <p>Alphabetical characters only</p>
                            )}
                        <br/>
                        <Text as='b'fontSize={14} fontFamily={'fantasy'} fontStyle={'italic'}>Name</Text>
                        <Input
                            placeholder='name' 
                            {...register("name", { pattern: /^[A-Za-z]+$/i })} />
                            {errors?.name?.type === "pattern" && (
                                <p>Alphabetical characters only</p>
                            )}
                        <br/>
                        <Text as='b'fontSize={14} fontFamily={'fantasy'} fontStyle={'italic'}>Age(Years)</Text>
                        <Input 
                            placeholder='years'
                            {...register("ageYears", {required:true, min: 1, max: 11 })} />
                            {errors.ageYears && (
                                <p>You Pet must not be more than 12 years old</p>
                            )}
                        <br/>
                        <Text as='b'fontSize={14} fontFamily={'fantasy'} fontStyle={'italic'}>Age(Months)</Text>
                        <Input
                            placeholder='months'
                            {...register("ageMonths", { required:true, min: 0, max: 11 })} />
                            {errors.ageMonths && (
                                <p>Months should be less than 11</p>
                            )}
                        <br/>
                        <Text as='b'fontSize={14} fontFamily={'fantasy'} fontStyle={'italic'}>Location</Text>
                        <Input
                            placeholder='city'
                            {...register("location", {required:true, pattern: /^[A-Za-z]+$/i })} />
                            {errors.location?.type==='pattern' && (
                                <p>City name must be Alphabetical </p>
                            )}
                        <br/>
                        <Text as='b'fontSize={14} fontFamily={'fantasy'} fontStyle={'italic'}>Zip</Text>
                        <Input
                            placeholder='zip'
                            {...register("zip", {required:true, pattern: /^[0-9]+$/i })} />
                            {errors.zip?.type==='pattern' && (
                                <p>Zip code must be numeric</p>
                            )}
                        <br/>
                        <Select
                            value={petPreMedicalCond}
                            isRequired
                            onChange={(e)=>{handlePreMedicalCond(e)}}
                            placeholder="Medical history"
                            py={1}
                            fontSize={14}
                            fontStyle={'italic'}
                            >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Select>

                        <br/>
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
}
export default PolicyForm
