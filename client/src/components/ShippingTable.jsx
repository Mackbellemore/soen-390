import React, { Fragment, useState, useContext } from 'react';
import { Table, Thead, Tbody, Tr, TableCaption, Heading, Button } from '@chakra-ui/react';
// import Loader from 'components/common/Loader';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination } from '@material-ui/core';
// import { NoResultImage } from 'components/common/Image.jsx';
import { RootStoreContext } from 'stores/stores.jsx';
import { MapContext } from 'react-map-gl';
import { mapLayerID, shippingStates, shippingStatesHide } from 'constants.js';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

const ShippingTable = () => {
  const { shippingStore } = useContext(RootStoreContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isSuccess = true; // TODO: remove when integrating with api
  const [shpmtData, setShpmtData] = useState(shippingStore.shippingData);
  const { map } = useContext(MapContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShpmtStateChange = (e) => {
    if (map._fullyLoaded) {
      const shipId = e.currentTarget.id;

      const numStates = shippingStates.length;

      setShpmtData((oldArr) => {
        const shpmtArr = [...oldArr];

        shpmtArr.find((elmt) => {
          const isTargetId = elmt._id == shipId;
          if (isTargetId) {
            const nextStateIdx = shippingStates.indexOf(elmt.status) + 1;
            const nextState = shippingStates[nextStateIdx % numStates];
            elmt.status = nextState;
          }

          return isTargetId;
        });
        shippingStore.setShippingData(shpmtArr);
        setShpmtData(shpmtArr);
        const newShpmtStatus = shippingStore.shpmtStatus(shipId);
        map.setLayoutProperty(
          mapLayerID + shipId,
          'visibility',
          shippingStatesHide.includes(newShpmtStatus) ? 'none' : 'visible'
        );

        // TODO: Update new changes to DB

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

  // TODO: Use when Shipping API is complete

  //   if (isLoading) {
  //     return <Loader />;
  //   }

  //   if (isSuccess && data.data.length === 0) {
  //     return (
  //       <>
  //         <Heading size="xl" textAlign="center" mt={5}>
  //           No Shipping
  //         </Heading>
  //         <NoResultImage />
  //       </>
  //     );
  //   }

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
                    <StyledTableCell>
                      <Button id={shipment._id} onClick={handleShpmtStateChange}>
                        {shipment.status}
                      </Button>
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
