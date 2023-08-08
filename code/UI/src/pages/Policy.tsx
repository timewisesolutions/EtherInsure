import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const Policy = () =>{
    return(
        <div>
            <Grid
                templateAreas={{
                    base: `"navbar" "main" "footer"`, // for mobile devices
                    lg: `"navbar " "main " "footer"` // for desktop
                }}
                gap='1'
            >
                <GridItem pl='2' area={'navbar'}>
                    <NavBar currentPage="Policy"/>
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    <Box as='b'>Policy Hero</Box>
                </GridItem>
                <GridItem pl='2' area={'footer'}>
                    <Footer/>
                </GridItem>
            </Grid>
        </div>
    )
}

export default Policy;
