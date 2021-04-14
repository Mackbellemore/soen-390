import { Heading, Table, Tbody, Thead, Tr, Box } from '@chakra-ui/react';
import { TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import Loader from 'components/common/Loader.jsx';
import { StyledTableCell, StyledTableHeader, StyledTableRow } from 'components/common/Table.jsx';
import FormModal from 'components/Order/FormModal.jsx';
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import { getOrders } from 'utils/api/orders.js';
import Head from 'next/head';
import usePagination from 'hooks/usePagination.jsx';
import { formatDate } from 'utils/dateFunctions.js';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const OrdersHeader = () => (
  <>
    <Head>
      <title>ERP - Orders</title>
    </Head>
    <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
      Orders
    </Heading>
  </>
);

const Orders = () => {
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();
  const { isLoading, isSuccess, data } = useQuery('orders', getOrders);
  const { setSearchInput, searchData } = useSearch();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <OrdersHeader />
        <Heading size="xl" textAlign="center" mt={5}>
          No orders found.
        </Heading>
        <FormModal showButton={true} />
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <OrdersHeader />
      <FormModal />
      <Search handleSearch={setSearchInput} />
      <Box overflowX="auto">
        <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
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
              searchData(data.data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <Fragment key={order._id}>
                    <StyledTableRow>
                      <StyledTableCell>{order.materialType}</StyledTableCell>
                      <StyledTableCell>{order.quantity}</StyledTableCell>
                      <StyledTableCell>{order.cost}</StyledTableCell>
                      <StyledTableCell>{formatDate(order.orderDate)}</StyledTableCell>
                      <StyledTableCell>{order.manufacturerName}</StyledTableCell>
                      <StyledTableCell>{order.vendorLocation}</StyledTableCell>
                      <StyledTableCell>{formatDate(order.deliveryDate)}</StyledTableCell>
                      <StyledTableCell>{order.status}</StyledTableCell>
                      <StyledTableCell>{order.note}</StyledTableCell>
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
      <ExportFiles section="orders" data={data.data} />
    </>
  );
};

export default Orders;
