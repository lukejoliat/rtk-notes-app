import { HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PostCount from "../../features/notes/PostCount";

const Nav = () => {
  return (
    <HStack>
      <Link as={RouterLink} to={"/"} p={2}>
        Home
      </Link>
      <Link as={RouterLink} to={"/about"} p={2}>
        About
      </Link>
    </HStack>
  );
};

export default Nav;
