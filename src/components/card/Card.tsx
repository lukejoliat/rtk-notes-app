import { Box, BoxProps, styled } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface CardProps extends BoxProps {
  boxShadow?: string;
  p?: number;
  height?: string | number;
  children: ReactNode;
  bg?: string;
}

const Card: FC<CardProps> = ({ ...props }) => {
  return (
    <Box {...props} p={2}>
      {props.children}
    </Box>
  );
};

export { Card };
