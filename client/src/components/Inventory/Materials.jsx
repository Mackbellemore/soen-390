import React, { Fragment, useState } from 'react';
import { Table, Thead, Tbody, Tr, TableCaption, Heading } from '@chakra-ui/react';
import Loader from 'components/common/Loader';
import { getMaterials } from 'utils/api/materials.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const Materials = () => {
  const { isLoading, isSuccess, data } = useQuery('materials', getMaterials);
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
          No Materials
        </Heading>
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
        <TableCaption placement="top">List of materials</TableCaption>
        <Thead>
          <Tr>
            <StyledTableHeader>Name</StyledTableHeader>
            <StyledTableHeader>Description</StyledTableHeader>
            <StyledTableHeader>Stock</StyledTableHeader>
            <StyledTableHeader>Weight</StyledTableHeader>
            <StyledTableHeader>Price</StyledTableHeader>
          </Tr>
        </Thead>
        <Tbody>
          {isSuccess &&
            data.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((material) => (
                <Fragment key={material._id}>
                  <StyledTableRow>
                    <StyledTableCell>{material.name}</StyledTableCell>
                    <StyledTableCell>{material.description}</StyledTableCell>
                    <StyledTableCell>{material.stock}</StyledTableCell>
                    <StyledTableCell>{material.weight}</StyledTableCell>
                    <StyledTableCell>{material.price}</StyledTableCell>
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
      <ExportFiles section="material" data={data.data} />
    </>
  );
};

export default Materials;
