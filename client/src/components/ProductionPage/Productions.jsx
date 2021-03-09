import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Productions = () => {
  return (
    <>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Order ID</Th>
            <Th>Component</Th>
            <Th>Option 1</Th>
            <Th>Option 2</Th>
            <Th>Quantity</Th>
            <Th>Expected Start Date</Th>
            <Th>Expected End Date</Th>
            <Th>Actual Start Date</Th>
            <Th>Actual End Date</Th>
            <Th>Manufacture</Th>
            <Th>Note</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th>Ongoing</Th>
            <Th>#3214512</Th>
            <Th>Frame</Th>
            <Th>Color Red</Th>
            <Th>Size 30 cm</Th>
            <Th>100</Th>
            <Th>01/22/15 17:15</Th>
            <Th>03/03/12 22:43</Th>
            <Th>03/03/12 22:43</Th>
            <Th>03/03/12 22:43</Th>
            <Th>A</Th>
            <Th />
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default Productions;
