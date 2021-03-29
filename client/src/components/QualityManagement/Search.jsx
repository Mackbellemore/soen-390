import { InputGroup, Input, InputRightElement, Flex, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRef } from 'react';

const Search = ({ handleSearch }) => {
  const input = useRef('');

  return (
    <Flex m={2}>
      <InputGroup size="md">
        <Input pr="4.5rem" type="text" placeholder="Search" ref={input} />
        <InputRightElement>
          <IconButton
            variant="ghost"
            colorScheme="blue"
            icon={<SearchIcon />}
            onClick={() => handleSearch(input.current.value)}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default Search;
