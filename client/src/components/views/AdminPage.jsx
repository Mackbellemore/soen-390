import { Table, Thead, Tbody, Tr, useToast, Heading, Box } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { getUsers, updateUser, deleteUser } from 'utils/api/users.js';
import { sendEmail } from 'utils/api/system.js';
import { useQuery } from 'react-query';
import { TableButton } from '../common/Button.jsx';
import Loader from '../common/Loader.jsx';
import Head from 'next/head';
import { StyledTableHeader, StyledTableCell } from '../common/Table.jsx';
import { NoResultImage } from '../common/Image.jsx';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';

const AdminPage = () => {
  const { isLoading, isSuccess, data, refetch } = useQuery('users', getUsers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { setSearchInput, searchData } = useSearch();

  const handleDeny = async (email) => {
    setIsSubmitting(true);
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
    setIsSubmitting(false);
  };

  const handleApprove = async (username, email) => {
    setIsSubmitting(true);
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
    setIsSubmitting(false);
  };

  const AdminTabTitle = () => (
    <Head>
      <title>ERP - Admin</title>
    </Head>
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.filter((user) => !user.approved).length === 0) {
    return (
      <>
        <AdminTabTitle />
        <Heading size="xl" textAlign="center" mt={5}>
          No User Requests
        </Heading>
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <Search handleSearch={setSearchInput} />
      <Box overflowX="auto">
        <AdminTabTitle />
        <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
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
              searchData(data.data)
                .filter((user) => !user.approved)
                .map((user) => (
                  <Fragment key={user.username}>
                    <Tr>
                      <StyledTableCell>{user.username}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>{user.role}</StyledTableCell>
                      <StyledTableCell>
                        <TableButton
                          isLoading={isSubmitting}
                          margin={1}
                          colorScheme="green"
                          onClick={() => handleApprove(user.username, user.email)}
                        >
                          Approve
                        </TableButton>
                        <TableButton
                          isLoading={isSubmitting}
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
      </Box>
    </>
  );
};

export default AdminPage;
