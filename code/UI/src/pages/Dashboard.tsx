import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <div>
      <Grid
        templateAreas={{
          base: `"navbar" "main" "footer"`, // for mobile devices
          lg: `"navbar " "main " "footer"`, // for desktop
        }}
        gap="1"
      >
        <GridItem pl="2" area={"navbar"}>
          <NavBar currentPage="Dashboard" />
        </GridItem>
        <GridItem pl="2" area={"main"} minH={"100vh"}>
          <Box as="b">Dashboard Hero</Box>
        </GridItem>
        <GridItem pl="2" area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </div>
  );
};

export default Dashboard;
