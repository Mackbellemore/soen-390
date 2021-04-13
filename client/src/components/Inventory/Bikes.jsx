import { Fragment } from 'react';
import { Table, Thead, Tbody, Tr, Heading, Box } from '@chakra-ui/react';
import Loader from 'components/common/Loader.jsx';
import { getBikes } from 'utils/api/bikes.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';
import usePagination from 'hooks/usePagination.jsx';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';

const Bikes = () => {
  const { isLoading, isSuccess, data } = useQuery('bikes', getBikes);
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();
  const { setSearchInput, searchData } = useSearch();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No bikes.
        </Heading>
        <NoResultImage />
      </>
    );
  }
  return (
    <>
      <Box overflowX="auto">
        <Search handleSearch={setSearchInput} />
        <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
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
              searchData(data.data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((bike) => (
                  <Fragment key={bike._id}>
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
      <ExportFiles section="products" data={data.data} />
    </>
  );
};

export default Bikes;
