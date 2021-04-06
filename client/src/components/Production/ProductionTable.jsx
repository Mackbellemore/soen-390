import { Table, Thead, Tbody, Tr, Th, TableCaption, Heading } from '@chakra-ui/react';
import { StyledTableRow, StyledTableCell } from 'components/common/Table.jsx';
import ProductionModal from 'components/Production/ProductionModal.jsx';
import { TablePagination } from '@material-ui/core';
import { Fragment } from 'react';
import Loader from 'components/common/Loader';
import { NoResultImage } from 'components/common/Image.jsx';
import useProductionTable from 'hooks/useProductionTable';

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

  if (isLoadingProduction && isLoadingBike && isLoadingPart) {
    return <Loader />;
  }

  if (isSuccessProduction && dataProduction.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Productions
        </Heading>
        <ProductionModal />;
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <ProductionModal />
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
        <TableCaption placement="top">List of productions</TableCaption>
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Component</Th>
            <Th>Quantity</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Assembly Machine</Th>
            <Th>Note</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isSuccessProduction &&
            isSuccessPart &&
            isSuccessBike &&
            dataProduction.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((production) => (
                <Fragment key={production._id}>
                  <StyledTableRow>
                    <StyledTableCell>{production.status}</StyledTableCell>
                    <StyledTableCell>
                      {findEntity(production.type, production.componentId).name}
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
