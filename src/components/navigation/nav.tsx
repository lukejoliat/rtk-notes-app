import { AddIcon } from "@chakra-ui/icons";
import { HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Nav = () => {
  return (
    <HStack color={"white"}>
      <Link as={RouterLink} to={"/"} p={2}>
        Home
      </Link>
      <Link as={RouterLink} to={"/about"} p={2}>
        About
      </Link>
      <Link as={RouterLink} to={"/create"} p={2}>
        <AddIcon />
      </Link>
    </HStack>
  );
};

export default Nav;
