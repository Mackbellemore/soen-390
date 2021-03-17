import React, { Fragment, useState } from 'react';
import {
  useToast,
  Textarea,
  Select,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import Loader from 'components/common/Loader.jsx';
import { getOrders, getMaterialList, postOrders } from 'utils/api/orders.js';
import { useQuery } from 'react-query';
import { StyledTableRow, StyledTableHeader, StyledTableCell } from 'components/common/Table.jsx';
import { TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';

const Orders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isSuccess, data, refetch } = useQuery('orders', getOrders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const toast = useToast();
  const [material, setMaterial] = useState();
  const [cost, setCost] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState();
  const [orderDate, setOrderDate] = useState();
  const [quantity, setQuantity] = useState(0);
  const [manufacturer, setManufacturer] = useState();
  const [location, setLocation] = useState();
  const [note, setNote] = useState();
  const materialTypes = ['rubber', 'aluminum', 'steel', 'copper', 'plastic', 'leather'];
  const materialCost = useQuery('orders/materialList', getMaterialList);

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

  // sets material and cost states
  const handleMaterial = (e) => {
    const choice = e.target.value;
    setMaterial(choice);
    setCost(materialCost.data.data[choice].cost);
  };

  // generates a random int within ranges
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const handleSubmit = async () => {
    const orderTime = new Date();
    const deliveryTime = new Date();
    const randomDeliveryDate = deliveryTime.getDate() + getRandomInt(1, 8); // random delivery date within a week
    deliveryTime.setDate(randomDeliveryDate);

    setOrderDate(orderTime);
    setDeliveryDate(deliveryTime);

    try {
      await postOrders({
        materialType: material,
        cost: cost,
        quantity: quantity,
        deliveryDate: deliveryDate,
        orderDate: orderDate,
        manufacturerName: manufacturer,
        vendorLocation: location,
        status: 'Pending',
        note: note,
      });
      toast({
        title: 'Order Placed',
        description: 'The order has been placed',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        position: 'top',
        title: 'An error occurred.',
        description: 'Unable to place order.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    refetch();
    onClose();
  };

  return (
    <>
      <Button
        margin={1}
        colorScheme="blue"
        variant="solid"
        leftIcon={<SmallAddIcon />}
        onClick={onOpen}
      >
        Place an order
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Place an order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Material</FormLabel>
              <Select placeholder="Select an option" onChange={handleMaterial}>
                {materialTypes.map((material) => (
                  <Fragment key={material._id}>
                    <option value={material}>{material}</option>
                  </Fragment>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Manufacturer</FormLabel>
              <Input placeholder="Manufacturer" onChange={(e) => setManufacturer(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Note to the manufacturer</FormLabel>
              <Textarea placeholder="Note" onChange={(e) => setNote(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
