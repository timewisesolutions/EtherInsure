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
