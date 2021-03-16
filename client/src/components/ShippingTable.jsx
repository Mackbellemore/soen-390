import React, { Fragment, useState, useContext } from 'react';
import { Table, Thead, Tbody, Tr, Heading, Button, Tooltip } from '@chakra-ui/react';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination } from '@material-ui/core';
import { RootStoreContext } from 'stores/stores.jsx';
import { MapContext } from 'react-map-gl';
import { mapLayerID, shippingStates, shippingStatesHide } from 'constants.js';
import { observer } from 'mobx-react-lite';

const ShippingTable = () => {
  const { shippingStore } = useContext(RootStoreContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isSuccess = true;
  const [shpmtData, setShpmtData] = useState(shippingStore.shippingData);
  const [label, setLabel] = useState(null);
  const { map } = useContext(MapContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getNextShpmtStatus = (currentStatus) => {
    const numStates = shippingStates.length;
    const nextStateIdx = shippingStates.indexOf(currentStatus) + 1;
    return shippingStates[nextStateIdx % numStates];
  };

  const handleShpmtStateChange = (e) => {
    if (map._fullyLoaded) {
      const shipId = e.currentTarget.id;

      setShpmtData((oldArr) => {
        const shpmtArr = [...oldArr];

        shpmtArr.find((elmt) => {
          const isTargetId = elmt._id == shipId;
          if (isTargetId) {
            elmt.status = getNextShpmtStatus(elmt.status);
          }

          return isTargetId;
        });
        shippingStore.setShippingData(shpmtArr);
        setShpmtData(shpmtArr);
        setLabel(getNextShpmtStatus(shippingStore.shpmtStatus(e.currentTarget.id)));

        const newShpmtStatus = shippingStore.shpmtStatus(shipId);
        map.setLayoutProperty(
          mapLayerID + shipId,
          'visibility',
          shippingStatesHide.includes(newShpmtStatus) ? 'none' : 'visible'
        );

        return shpmtArr;
      });
    }
  };

  const handleHover = (e, eType) => {
    if (map._fullyLoaded) {
      shippingStore.getDestIds.map((destId) => {
        const focusId = destId == e.currentTarget.id;
        const hideStatus = shippingStatesHide.includes(shippingStore.shpmtStatus(destId));

        if (eType == 'over') {
          map.setLayoutProperty(
            mapLayerID + destId,
            'visibility',
            !focusId || hideStatus ? 'none' : 'visible'
          );
        }

        if (eType == 'out') {
          map.setLayoutProperty(mapLayerID + destId, 'visibility', hideStatus ? 'none' : 'visible');
        }
      });
    }
  };

  const showLabel = (e) => {
    setLabel(getNextShpmtStatus(shippingStore.shpmtStatus(e.currentTarget.id)));
  };

  return (
    <>
      <Heading size="xl" textAlign="center" mt={5}>
        Shipping
      </Heading>
      <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
        <Thead>
          <Tr>
            <StyledTableHeader>Order ID</StyledTableHeader>
            <StyledTableHeader>Status</StyledTableHeader>
            <StyledTableHeader>Company</StyledTableHeader>
            <StyledTableHeader>Location</StyledTableHeader>
            <StyledTableHeader>Shipping Date</StyledTableHeader>
            <StyledTableHeader>Delivery Date</StyledTableHeader>
          </Tr>
        </Thead>
        <Tbody>
          {isSuccess &&
            shpmtData
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
                    <StyledTableCell>{shipment._id}</StyledTableCell>
                    <StyledTableCell id={shipment._id} onMouseOver={showLabel}>
                      <Tooltip
                        label={'Next Status [' + label + ']'}
                        placement="top-start"
                        closeOnClick={false}
                      >
                        <Button id={shipment._id} onClick={handleShpmtStateChange}>
                          {shipment.status}
                        </Button>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell>{shipment.company}</StyledTableCell>
                    <StyledTableCell>{shipment.location}</StyledTableCell>
                    <StyledTableCell>{shipment.shippingDate}</StyledTableCell>
                    <StyledTableCell>{shipment.deliveryDate}</StyledTableCell>
                  </StyledTableRow>
                </Fragment>
              ))}
        </Tbody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={shpmtData.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default observer(ShippingTable);
