import React, { Fragment, useState } from 'react';
import { Table, Thead, Tbody, Tr, TableCaption, Heading } from '@chakra-ui/react';
import Loader from 'components/common/Loader.jsx';
import { getOrders } from 'utils/api/orders.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';

const Orders = () => {
  const { isLoading, isSuccess, data } = useQuery('orders', getOrders);
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
          No orders found.
        </Heading>
        <NoResultImage />
      </>
    );
  }
  return (
    <>
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
        <TableCaption placement="top">List of orders</TableCaption>
        <Thead>
          <Tr>
            <StyledTableHeader>Material</StyledTableHeader>
            <StyledTableHeader>Quantity</StyledTableHeader>
            <StyledTableHeader>Cost</StyledTableHeader>
            <StyledTableHeader>Order Date</StyledTableHeader>
            <StyledTableHeader>Manufacturer</StyledTableHeader>
            <StyledTableHeader>Location</StyledTableHeader>
            <StyledTableHeader>Delivery Date</StyledTableHeader>
            <StyledTableHeader>Status</StyledTableHeader>
            <StyledTableHeader>Note</StyledTableHeader>
          </Tr>
        </Thead>
        <Tbody>
          {isSuccess &&
            data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <Fragment key={order._id}>
                <StyledTableRow>
                  <StyledTableCell>{order.materialType}</StyledTableCell>
                  <StyledTableCell>{order.quantity}</StyledTableCell>
                  <StyledTableCell>{order.cost}</StyledTableCell>
                  <StyledTableCell>{order.orderDate}</StyledTableCell>
                  <StyledTableCell>{order.manufacturerName}</StyledTableCell>
                  <StyledTableCell>{order.vendorLocation}</StyledTableCell>
                  <StyledTableCell>{order.deliveryDate}</StyledTableCell>
                  <StyledTableCell>{order.status}</StyledTableCell>
                  <StyledTableCell>{order.note}</StyledTableCell>
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

export default Orders;
