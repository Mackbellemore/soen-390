import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { getUsers } from 'utils/api/users.js';
import { useQuery } from 'react-query';
import { TableButton } from '../common/Button.jsx';

const StyledTableHeader = styled(Th)`
  text-align: center;
`;

const StyledTableCell = styled(Td)`
  text-align: center;
`;

const AdminPage = () => {
  const { isLoading, isSuccess, data } = useQuery('users', getUsers);

  const handleDeny = (email) => {};

  const handleApprove = (email) => {};

  return (
    <>
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="gray">
        <TableCaption placement="top">List of users</TableCaption>
        <Thead>
          <Tr>
            <StyledTableHeader>Username</StyledTableHeader>
            <StyledTableHeader>E-mail</StyledTableHeader>
            <StyledTableHeader>Role</StyledTableHeader>
            <StyledTableHeader></StyledTableHeader>
          </Tr>
        </Thead>
        <Tbody>
          {isSuccess &&
            data.data.map((user) => (
              <Fragment key={user.username}>
                <Tr>
                  <StyledTableCell>{user.username}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.role}</StyledTableCell>
                  <StyledTableCell>
                    <TableButton
                      margin={1}
                      colorScheme="green"
                      onClick={() => handleApprove(user.email)}
                    >
                      Approve
                    </TableButton>
                    <TableButton
                      margin={1}
                      colorScheme="red"
                      onClick={() => handleDeny(user.email)}
                    >
                      Deny
                    </TableButton>
                  </StyledTableCell>
                </Tr>
              </Fragment>
            ))}
        </Tbody>
      </Table>
    </>
  );
};

export default AdminPage;
