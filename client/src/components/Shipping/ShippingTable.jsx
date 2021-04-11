import React, { Fragment } from 'react';
import {
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Heading,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination } from '@material-ui/core';
import { shippingStates } from 'constants.js';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import AddShipmentForm from './AddShipmentForm.jsx';
import useShippingTable from 'hooks/useShippingTable.jsx';
import { formatDate } from 'utils/dateFunctions.js';
import Loader from 'components/common/Loader.jsx';
import Head from 'next/head';
import usePagination from 'hooks/usePagination.jsx';
import { observer } from 'mobx-react-lite';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const ShippingHeader = () => (
  <>
    <Head>
      <title>ERP - Shipping</title>
    </Head>
    <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
      Shippings
    </Heading>
  </>
);
const ShippingTable = () => {
  const {
    isSelected,
    handleSelectAllClick,
    handleOnChange,
    handleDelete,
    handleShpmtStateChange,
    handleHover,
    isLoading,
    isSuccess,
    data,
    selected,
  } = useShippingTable();

  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();
  const { setSearchInput, searchData } = useSearch();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <ShippingHeader />
        <Heading size="xl" textAlign="center" mt={5}>
          No shippings found.
        </Heading>
        <AddShipmentForm showButton={true} />
      </>
    );
  }
  return (
    <>
      <ShippingHeader />
      <AddShipmentForm />
      <IconButton
        colorScheme="blue"
        variant="outline"
        aria-label="delete"
        float="right"
        m={2}
        icon={<DeleteIcon />}
        onClick={handleDelete}
        isDisabled={selected.length === 0}
      />
      <Search handleSearch={setSearchInput} />
      {data ? (
        <>
          <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
            <Thead>
              <Tr>
                <StyledTableHeader>
                  <Checkbox
                    isIndeterminate={selected.length > 0 && selected.length < data.data.length}
                    isChecked={data.data.length > 0 && selected.length === data.data.length}
                    onChange={handleSelectAllClick}
                  >
                    Order ID
                  </Checkbox>
                </StyledTableHeader>
                <StyledTableHeader>Status</StyledTableHeader>
                <StyledTableHeader>Company</StyledTableHeader>
                <StyledTableHeader>Location</StyledTableHeader>
                <StyledTableHeader>Shipping Date</StyledTableHeader>
                <StyledTableHeader>Delivery Date</StyledTableHeader>
              </Tr>
            </Thead>
            <Tbody>
              {isSuccess &&
                data.data.length > 0 &&
                searchData(data.data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((shipment) => (
                    <Fragment key={shipment._id}>
                      <StyledTableRow
                        id={shipment._id}
                        onMouseOver={(e) => {
                          handleHover(e, 'over');
                        }}
                        onMouseOut={(e) => {
                          handleHover(e, 'out');
                        }}
                      >
                        <StyledTableCell>
                          {' '}
                          <Checkbox
                            isChecked={isSelected(shipment._id)}
                            onChange={(event) => handleOnChange(event, shipment._id)}
                          >
                            {shipment._id.slice(10)}
                          </Checkbox>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={3}>
                              {shipment.status}
                            </MenuButton>
                            <MenuList>
                              {shippingStates.map((status) => (
                                <MenuItem
                                  key={status}
                                  value={status}
                                  onClick={handleShpmtStateChange}
                                >
                                  {status}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu>
                        </StyledTableCell>
                        <StyledTableCell>{shipment.company}</StyledTableCell>
                        <StyledTableCell>{shipment.location}</StyledTableCell>
                        <StyledTableCell>{formatDate(shipment.shippingDate)}</StyledTableCell>
                        <StyledTableCell>{formatDate(shipment.deliveryDate)}</StyledTableCell>
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
          <ExportFiles section="shippings" data={data.data} />
        </>
      ) : null}
    </>
  );
};

export default observer(ShippingTable);
