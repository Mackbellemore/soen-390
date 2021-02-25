import { Table, Thead, Tbody, Tr, TableCaption, useToast, Heading, Image } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { getUsers, updateUser, deleteUser } from 'utils/api/users.js';
import { sendEmail } from 'utils/api/system.js';
import { useQuery } from 'react-query';
import { TableButton } from '../common/Button.jsx';
import Loader from '../common/Loader.jsx';
import Head from 'next/head';
import { StyledTableHeader, StyledTableCell } from '../common/Table';

const AdminPage = () => {
  const { isLoading, isSuccess, data, refetch } = useQuery('users', getUsers);
  const toast = useToast();

  const handleDeny = async (email) => {
    try {
      await deleteUser({
        email: email,
      });
      toast({
        title: 'User Deleted',
        description: 'The User has been Deleted',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        position: 'top',
        title: 'An error occurred.',
        description: 'Unable to delete',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    refetch();
  };

  const handleApprove = async (username, email) => {
    try {
      await updateUser(
        {
          approved: true,
        },
        username
      );
      await sendEmail({
        to: [email],
        subject: 'ERP Account Accepted',
        emailBody:
          'Your request to create an account has been accepted, You may now login and access our service',
      });
      toast({
        title: 'User has been approved',
        description: 'The User has been approved',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        position: 'top',
        title: 'An error occurred.',
        description: 'Unable to delete',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.filter((user) => !user.approved).length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No User Requests
        </Heading>
        <Image
          src="/images/noResults.png"
          alt="No results illustration"
          width="100%"
          height="100%"
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>ERP - Admin</title>
      </Head>
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
        <TableCaption placement="top">List of users</TableCaption>
        <Thead>
          <Tr>
            <StyledTableHeader>Username</StyledTableHeader>
            <StyledTableHeader>E-mail</StyledTableHeader>
            <StyledTableHeader>Role</StyledTableHeader>
            <StyledTableHeader />
          </Tr>
        </Thead>
        <Tbody>
          {isSuccess &&
            data.data
              .filter((user) => !user.approved)
              .map((user) => (
                <Fragment key={user.username}>
                  <Tr>
                    <StyledTableCell>{user.username}</StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    <StyledTableCell>{user.role}</StyledTableCell>
                    <StyledTableCell>
                      <TableButton
                        margin={1}
                        colorScheme="green"
                        onClick={() => handleApprove(user.username, user.email)}
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
