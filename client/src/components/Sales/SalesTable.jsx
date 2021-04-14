import { Box, Heading, Table, Tbody, Thead, Tr } from '@chakra-ui/react';
import { Paper, TableContainer, TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import Loader from 'components/common/Loader';
import { StyledTableHeader } from 'components/common/Table.jsx';
import usePagination from 'hooks/usePagination.jsx';
import { useQuery } from 'react-query';
import { getSales } from 'utils/api/sales.js';
import SalesModal from './Modal.jsx';
import SaleRow from './Row.jsx';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const SalesTable = () => {
  const { isLoading, isSuccess, data } = useQuery('sales', getSales);
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();
  const { setSearchInput, searchData } = useSearch();

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
      <SalesModal />
      <Search handleSearch={setSearchInput} />
      <Box overflowX="auto">
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
                searchData(data.data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((sale) => <SaleRow key={sale._id} sale={sale} />)}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={data.data.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ExportFiles section="sales" data={data.data} />
    </>
  );
};

export default SalesTable;
