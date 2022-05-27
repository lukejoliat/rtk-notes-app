import { Heading, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

interface CardHeaderProps {
  heading: string;
  subheading: string;
}

const CardHeader: FC<CardHeaderProps> = ({ heading, subheading }) => {
  return (
    <VStack align={"left"}>
      <Heading size="md">{heading}</Heading>
      <Heading as="h3" size="sm">
        <Text as="em">{subheading}</Text>
      </Heading>
    </VStack>
  );
};

export { CardHeader };
