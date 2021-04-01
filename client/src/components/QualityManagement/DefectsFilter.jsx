import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Select,
  Button,
  Stack,
} from '@chakra-ui/react';
import { VscFilter } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const DefectsFilter = ({ handleFilter }) => {
  const type = useRef('');
  const status = useRef('');

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton colorScheme="blue" variant="outline" float="right" m={2} icon={<VscFilter />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Filter</PopoverHeader>
        <PopoverBody>
          <Stack spacing={4}>
            <Select placeholder="Type" ref={type}>
              <option value="Broken">Broken</option>
              <option value="Reparable">Reparable</option>
            </Select>
            <Select placeholder="Status" ref={status}>
              <option value="Solved">Solved</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
            </Select>
            <Button
              onClick={() => handleFilter(type.current.value, status.current.value)}
              colorScheme="blue"
              mr={3}
            >
              Apply
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

DefectsFilter.propTypes = {
  handleFilter: PropTypes.func,
};

export default DefectsFilter;
