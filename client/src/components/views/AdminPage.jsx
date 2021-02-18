import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const AdminPage = () => {
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>E-mail</Th>
            <Th>Approve</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};

export default AdminPage;
