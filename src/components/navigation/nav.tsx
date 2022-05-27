import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Nav = () => {
  return (
    <Flex color={"white"}>
      <Box>
        <Link as={RouterLink} to={"/"} p={2}>
          Home
        </Link>
      </Box>
      <Box>
        <Link as={RouterLink} to={"/about"} p={2}>
          About
        </Link>
      </Box>
      <Box flex={1} textAlign={"right"}>
        <Link as={RouterLink} to={"/create"} p={2}>
          <AddIcon />
        </Link>
      </Box>
    </Flex>
  );
};

export default Nav;
