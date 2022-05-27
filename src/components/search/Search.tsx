import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FC } from "react";
import { UseInputReturn } from "../../hooks/useInput";

interface SearchProps {
  search: UseInputReturn;
}

const Search: FC<SearchProps> = ({ search }) => {
  return (
    <InputGroup>
      <Input type="text" {...search} placeholder="Search Notes..." my={2} />
      <InputRightElement children={<SearchIcon color="green.500" />} />
    </InputGroup>
  );
};

export default Search;
