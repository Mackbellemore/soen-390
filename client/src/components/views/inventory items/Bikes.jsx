import React, { Fragment, useState } from 'react';
import { Table, Thead, Tbody, Tr, TableCaption, Heading, Image } from '@chakra-ui/react';
import Loader from 'components/common/Loader';
import { getBikes } from 'utils/api/bikes.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from '../../common/Table';
import { TablePagination } from '@material-ui/core';

const Bikes = () => {
  const { isLoading, isSuccess, data } = useQuery('bikes', getBikes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No bikes.
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
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
        <TableCaption placement="top">List of bike products</TableCaption>
        <Thead>
          <Tr>
            <StyledTableHeader>Name</StyledTableHeader>
            <StyledTableHeader>Description</StyledTableHeader>
            <StyledTableHeader>Weight Amount</StyledTableHeader>
            <StyledTableHeader>Weight Type</StyledTableHeader>
            <StyledTableHeader>Selling Price</StyledTableHeader>
            <StyledTableHeader>Cost Price</StyledTableHeader>
            <StyledTableHeader>Color</StyledTableHeader>
          </Tr>
        </Thead>
        <Tbody>
          {isSuccess &&
            data.data.map((bike) => (
              <Fragment key={bike.id}>
                <StyledTableRow>
                  <StyledTableCell>{bike.name}</StyledTableCell>
                  <StyledTableCell>{bike.description}</StyledTableCell>
                  <StyledTableCell>{bike.weightAmount}</StyledTableCell>
                  <StyledTableCell>{bike.weightType}</StyledTableCell>
                  <StyledTableCell>{bike.sellingPrice}</StyledTableCell>
                  <StyledTableCell>{bike.costPrice}</StyledTableCell>
                  <StyledTableCell>{bike.color}</StyledTableCell>
                </StyledTableRow>
              </Fragment>
            ))}
        </Tbody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={data.data.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Bikes;
