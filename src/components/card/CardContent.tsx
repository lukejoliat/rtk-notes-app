import { Box, BoxProps, Text } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface CardContentProps extends BoxProps {
  children: ReactNode;
}

const CardContent: FC<CardContentProps> = ({ children, ...props }) => {
  return (
    <Box {...props}>
      <Text>{children}</Text>
    </Box>
  );
};

export { CardContent };
