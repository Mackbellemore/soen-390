import React, { Fragment, useState } from 'react';
import { Table, Thead, Tbody, Tr, TableCaption, Heading } from '@chakra-ui/react';
import Loader from 'components/common/Loader';
import { getParts } from 'utils/api/parts.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const Parts = () => {
  const { isLoading, isSuccess, data } = useQuery('parts', getParts);
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
          No Parts
        </Heading>
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
        <TableCaption placement="top">List of parts</TableCaption>
        <Thead>
          <Tr>
            <StyledTableHeader>Name</StyledTableHeader>
            <StyledTableHeader>Description</StyledTableHeader>
            <StyledTableHeader>Quality</StyledTableHeader>
            <StyledTableHeader>Type</StyledTableHeader>
            <StyledTableHeader>Color</StyledTableHeader>
            <StyledTableHeader>Finish</StyledTableHeader>
            <StyledTableHeader>Grade</StyledTableHeader>
            <StyledTableHeader>Detail</StyledTableHeader>
          </Tr>
        </Thead>
        <Tbody>
          {isSuccess &&
            data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((part) => (
              <Fragment key={part._id}>
                <StyledTableRow>
                  <StyledTableCell>{part.name}</StyledTableCell>
                  <StyledTableCell>{part.description}</StyledTableCell>
                  <StyledTableCell>{part.quality}</StyledTableCell>
                  <StyledTableCell>{part.type}</StyledTableCell>
                  <StyledTableCell>{part.color}</StyledTableCell>
                  <StyledTableCell>{part.finish}</StyledTableCell>
                  <StyledTableCell>{part.grade}</StyledTableCell>
                  <StyledTableCell>{part.detail}</StyledTableCell>
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
      <ExportFiles section="material" data={data.data}></ExportFiles>
    </>
  );
};

export default Parts;
