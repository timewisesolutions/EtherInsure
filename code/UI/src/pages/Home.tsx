import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import PetCard from "@/components/PetCard";
import BlockchainCard from "@/components/BlockchainCard";
import Footer from "@/components/Footer";
import "@/custom.css";

const Home = () => {
    return (
        <div>
            <Grid
                templateAreas={{
                    base: `"navbar" "main" "footer"`, // for mobile devices
                    lg: `"navbar " "main " "footer"` // for desktop
                }}

                gap='1'
            >
                <GridItem pl='2' area={'navbar'}>
                    <NavBar currentPage="Home"/>
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    <SimpleGrid templateRows='repeat(2, 1fr)' spacing={5}>
                        <PetCard/>
                        <BlockchainCard/>
                    </SimpleGrid>
                </GridItem>
                <GridItem pl='2' area={'footer'}>
                    <Footer/>
                </GridItem>
            </Grid>
        </div>
    );
}
export default Home; 