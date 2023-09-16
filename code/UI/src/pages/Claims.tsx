import ClaimsMain from "@/components/ClaimsMain";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

const Claims = () => {
  return (
    <Flex direction="column" flex="1">
      <NavBar currentPage="Claims" />
      <ClaimsMain />
      <Footer />
    </Flex>
  );
};

export default Claims;

/*
        <div>
            <Grid
                templateAreas={{
                    base: `"navbar" "main" "footer"`, // for mobile devices
                    lg: `"navbar " "main " "footer"` // for desktop
                }}
                gap='1'
            >
                <GridItem pl='2' area={'navbar'}>
                    <NavBar currentPage="Claims"/>
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    <Box as='b'>Claims Hero</Box>
                </GridItem>
                <GridItem pl='2' area={'footer'}>
                    <Footer/>
                </GridItem>
            </Grid>
        </div>





*/
