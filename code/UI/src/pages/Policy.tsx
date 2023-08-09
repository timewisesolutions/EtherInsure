import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import PolicyMain from "@/components/PolicyMain";
import { Flex, Box, Grid, GridItem } from "@chakra-ui/react";


const Policy = () =>{
    return(
        <Flex direction="column" flex="1" >
            <NavBar currentPage="Policy" />
            <PolicyMain />
            <Footer />
        </Flex>
   )
}

export default Policy;
