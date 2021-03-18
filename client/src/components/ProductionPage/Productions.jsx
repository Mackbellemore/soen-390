import { Table, Thead, Tbody, Tr, Th, Heading, TableCaption } from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { getProductions } from 'utils/api/productions';
import { useQuery } from 'react-query';
import Loader from 'components/common/Loader';
import { StyledTableRow, StyledTableCell } from 'components/common/Table.jsx';
import { NoResultImage } from 'components/common/Image.jsx';
import { TablePagination } from '@material-ui/core';

const Productions = () => {
  const { isLoading, isSuccess, data } = useQuery('productions', getProductions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (date) => {
    const displayDate = new Date(date);
    const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return displayDate.toLocaleDateString(undefined, dateFormat);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Productions
        </Heading>
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
        <TableCaption placement="top">List of productions</TableCaption>
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Order ID</Th>
            <Th>Component</Th>
            <Th>Option 1</Th>
            <Th>Option 2</Th>
            <Th>Quantity</Th>
            <Th>Expected Start Date</Th>
            <Th>Expected End Date</Th>
            <Th>Actual Start Date</Th>
            <Th>Actual End Date</Th>
            <Th>Manufacture</Th>
            <Th>Note</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((production) => (
              <Fragment key={production.id}>
                <StyledTableRow>
                  <StyledTableCell>{production.status}</StyledTableCell>
                  <StyledTableCell>{production.orderID}</StyledTableCell>
                  <StyledTableCell>{production.component}</StyledTableCell>
                  <StyledTableCell>{production.option1}</StyledTableCell>
                  <StyledTableCell>{production.option2}</StyledTableCell>
                  <StyledTableCell>{production.quantity}</StyledTableCell>
                  <StyledTableCell>{formatDate(production.expectedStartDate)}</StyledTableCell>
                  <StyledTableCell>{formatDate(production.expectedEndDate)}</StyledTableCell>
                  <StyledTableCell>{formatDate(production.actualStartDate)}</StyledTableCell>
                  <StyledTableCell>{formatDate(production.actualEndDate)}</StyledTableCell>
                  <StyledTableCell>{production.note}</StyledTableCell>
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

export default Productions;
