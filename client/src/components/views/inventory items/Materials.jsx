import React, { useContext, useEffect, useRef, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, useToast, Button } from '@chakra-ui/react';

const Materials = (props) => {
  const materials = props.items;

  const makeTableItems = () => {
    materials.map((material) => (
      <Tr>
        <Td>{material.name}</Td>
        <Td>{material.description}</Td>
        <Td>{material.stock}</Td>
        <Td>{material.weight}</Td>
        <Td>{material.price}</Td>
      </Tr>
    ));
  };

  return (
    <Table variant="striped" colorScheme="green">
      {console.log(materials)}
      <TableCaption placement="top">List of materials</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Stock</Th>
          <Th>Weight</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody>{makeTableItems}</Tbody>
    </Table>
  );
};

export default Materials;
