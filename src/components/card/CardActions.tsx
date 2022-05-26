import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface CardActionsProps {
  children: ReactNode;
}

const CardActions: FC<CardActionsProps> = ({ children }) => {
  return (
    <Flex justifyContent={"space-between"} mt={2}>
      {children}
    </Flex>
  );
};

export { CardActions };
