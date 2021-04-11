import { InputGroup, Input, InputRightElement, Flex } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const Search = ({ handleSearch }) => {
  return (
    <Flex m={2}>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <InputRightElement>
          <SearchIcon color="blue.600" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func,
};

export default Search;
