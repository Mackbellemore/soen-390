import { Box, Heading, Table, Tbody, Text, Thead, Tr } from '@chakra-ui/react';
import { Paper, TableContainer, TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import Loader from 'components/common/Loader';
import { StyledTableHeader } from 'components/common/Table.jsx';
import usePagination from 'hooks/usePagination.jsx';
import { useQuery } from 'react-query';
import { getSales } from 'utils/api/sales.js';
import SaleRow from './Row.jsx';
import SalesModal from './Modal.jsx';

const SalesTable = () => {
  const { isLoading, isSuccess, data } = useQuery('sales', getSales);
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Sales Yet
        </Heading>
        <SalesModal showButton />
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <Box overflowX="auto">
        <SalesModal />
        <TableContainer component={Paper}>
          <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
            <Thead>
              <Tr>
                <StyledTableHeader>Product Name</StyledTableHeader>
                <StyledTableHeader>Customer</StyledTableHeader>
                <StyledTableHeader>Quantity</StyledTableHeader>
                <StyledTableHeader>Total</StyledTableHeader>
                <StyledTableHeader>Status</StyledTableHeader>
                <StyledTableHeader />
              </Tr>
            </Thead>
            <Tbody>
              {isSuccess &&
                data.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((sale) => <SaleRow key={sale._id} sale={sale} />)}
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
        </TableContainer>
      </Box>
      <Text textAlign="center">Click a row for more information</Text>
    </>
  );
};

export default SalesTable;
