import React, { Fragment, useState, useRef } from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
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
  const manufacturer = useRef('');
  const location = useRef('');
  const note = useRef('');
  const materialTypes = ['rubber', 'aluminum', 'steel', 'copper', 'plastic', 'leather'];
  const materialCost = useQuery('orders/materialList', getMaterialList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // sets material and cost states
  const handleMaterial = (e) => {
    const choice = e.target.value;
    setMaterial(choice);
    setCost(materialCost.data.data[choice].cost);
  };

  // generates a random int within ranges
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

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
        manufacturerName: manufacturer.current.value,
        vendorLocation: location.current.value,
        status: 'Pending',
        note: note.current.value,
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

  const openOrderForm = () => (
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
            <NumberInput min={1} defaultValue={1} onChange={(e) => setQuantity(e)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Manufacturer</FormLabel>
            <Input placeholder="Manufacturer" ref={manufacturer} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Input placeholder="Location" ref={location} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Note to the manufacturer</FormLabel>
            <Textarea placeholder="Note" ref={note} />
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
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No orders found.
        </Heading>
        <Center mt={4}>
          <Button onClick={onOpen}>Place an order</Button>
        </Center>
        {openOrderForm()}
        <NoResultImage />
      </>
    );
  }

  const formatDate = (date) => {
    const displayDate = new Date(date);
    const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return displayDate.toLocaleDateString(undefined, dateFormat);
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
      {openOrderForm()}
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
