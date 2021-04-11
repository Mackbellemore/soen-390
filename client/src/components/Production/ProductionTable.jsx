import { Table, Thead, Tbody, Tr, Heading, Box } from '@chakra-ui/react';
import { StyledTableRow, StyledTableCell, StyledTableHeader } from 'components/common/Table.jsx';
import ProductionModal from 'components/Production/ProductionModal.jsx';
import { TablePagination } from '@material-ui/core';
import { Fragment } from 'react';
import Loader from 'components/common/Loader';
import { NoResultImage } from 'components/common/Image.jsx';
import useProductionTable from 'hooks/useProductionTable';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';

const ProductionTable = () => {
  const {
    isLoadingProduction,
    isSuccessProduction,
    dataProduction,
    isLoadingPart,
    isSuccessPart,
    isLoadingBike,
    isSuccessBike,
    page,
    rowsPerPage,
    findEntity,
    handleChangePage,
    handleChangeRowsPerPage,
    formatDate,
  } = useProductionTable();
  const { setSearchInput, searchData } = useSearch();

  if (isLoadingProduction || isLoadingBike || isLoadingPart) {
    return <Loader />;
  }

  if (isSuccessProduction && dataProduction.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Productions
        </Heading>
        <ProductionModal showButton={true} />
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <ProductionModal />
      <Search handleSearch={setSearchInput} />
      <Box overflowX="scroll">
        <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
          <Thead>
            <Tr>
              <StyledTableHeader>Status</StyledTableHeader>
              <StyledTableHeader>Component</StyledTableHeader>
              <StyledTableHeader>Quantity</StyledTableHeader>
              <StyledTableHeader>Start Date</StyledTableHeader>
              <StyledTableHeader>End Date</StyledTableHeader>
              <StyledTableHeader>Assembly Machine</StyledTableHeader>
              <StyledTableHeader>Note</StyledTableHeader>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccessProduction &&
              isSuccessPart &&
              isSuccessBike &&
              searchData(dataProduction.data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((production) => (
                  <Fragment key={production._id}>
                    <StyledTableRow>
                      <StyledTableCell>{production.status}</StyledTableCell>
                      <StyledTableCell>
                        {findEntity(production.type, production.componentId)?.name}
                      </StyledTableCell>
                      <StyledTableCell>{production.quantity}</StyledTableCell>
                      <StyledTableCell>{formatDate(production.startDate)}</StyledTableCell>
                      <StyledTableCell>{formatDate(production.endDate)}</StyledTableCell>
                      <StyledTableCell>{production.assemblyMachine}</StyledTableCell>
                      <StyledTableCell>{production.note}</StyledTableCell>
                    </StyledTableRow>
                  </Fragment>
                ))}
          </Tbody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={dataProduction.data.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ProductionTable;
