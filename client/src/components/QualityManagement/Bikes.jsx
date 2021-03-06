import { Box, Heading, Table, Tbody, Thead, Tr } from '@chakra-ui/react';
import { Paper, TableContainer, TablePagination } from '@material-ui/core';
import { StyledTableCell, StyledTableHeader, StyledTableRow } from 'components/common/Table.jsx';
import { NoResultImage } from 'components/common/Image.jsx';
import Loader from 'components/common/Loader';
import usePagination from 'hooks/usePagination.jsx';
import { useQuery } from 'react-query';
import { getBikeDefects } from 'utils/api/defect.js';
import DefectsTable from './DefectsTable.jsx';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const Bikes = () => {
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();
  const { isLoading, isSuccess, data } = useQuery('bikeDefects', getBikeDefects);
  const { setSearchInput, searchData } = useSearch();

  const exportData = [];

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Defects
        </Heading>
        <NoResultImage />
      </>
    );
  }

  if (isSuccess) {
    data.data.forEach((dataArr) => {
      dataArr.defects.forEach((defect) => {
        defect.bike = dataArr.bike;
        exportData.push(defect);
      });
    });
  }

  return (
    <>
      <Search handleSearch={setSearchInput} />
      <Box overflowX="auto">
        <TableContainer component={Paper}>
          <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
            <Thead>
              <Tr>
                <StyledTableHeader>Bike Name</StyledTableHeader>
                <StyledTableHeader>Number of Defects </StyledTableHeader>
                <StyledTableHeader>Details </StyledTableHeader>
              </Tr>
            </Thead>
            <Tbody>
              {isSuccess &&
                searchData(data.data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bikeDefect) => (
                    <StyledTableRow key={bikeDefect.bike}>
                      <StyledTableCell>{bikeDefect.bike}</StyledTableCell>
                      <StyledTableCell>{bikeDefect.defects.length}</StyledTableCell>
                      <StyledTableCell>
                        <DefectsTable bike={bikeDefect.bike} defects={bikeDefect.defects} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
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
      <ExportFiles section="bikes_defects" data={exportData} />
    </>
  );
};

export default Bikes;
