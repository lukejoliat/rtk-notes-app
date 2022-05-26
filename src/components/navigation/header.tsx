import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface HeaderProps {
  children: any;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <Box as="header" p={2} bg="blue.900">
      {children}
    </Box>
  );
};

export default Header;
