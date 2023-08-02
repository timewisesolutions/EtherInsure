import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PetCard from "./components/PetCard";
import BlockchainCard from "./components/BlockchainCard";

export default function Home() {
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
                    <NavBar />
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    <SimpleGrid templateRows='repeat(2, 1fr)' spacing={5}>
                        <PetCard/>
                        <BlockchainCard/>
                    </SimpleGrid>
                </GridItem>
                <GridItem pl='2' bgGradient="radial(gray.300, yellow.400, pink.200)" area={'footer'}>
                    Footer
                </GridItem>
            </Grid>
        </div>
    );
}
