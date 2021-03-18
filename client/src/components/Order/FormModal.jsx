import { SmallAddIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { Fragment, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getMaterialList, getOrders, postOrders } from 'utils/api/orders.js';

// generates a random int within ranges
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const FormModal = ({ showButton = false }) => {
  // TODO: use the endpoint to get this constant list of materials rather than hardcoding
  const materialTypes = ['rubber', 'aluminum', 'steel', 'copper', 'plastic', 'leather'];
  const [quantity, setQuantity] = useState(0);
  const manufacturer = useRef('');
  const location = useRef('');
  const note = useRef('');
  const toast = useToast();
  const [material, setMaterial] = useState();
  const [cost, setCost] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState();
  const [orderDate, setOrderDate] = useState();
  const materialCost = useQuery('orders/materialList', getMaterialList);
  const { refetch } = useQuery('orders', getOrders);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // sets material and cost states
  const handleMaterial = (e) => {
    const choice = e.target.value;
    setMaterial(choice);
    setCost(materialCost.data.data[choice].cost);
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

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onOpen}>Place an order</Button>
        </Center>
      ) : (
        <Button
          margin={1}
          colorScheme="blue"
          variant="solid"
          leftIcon={<SmallAddIcon />}
          onClick={onOpen}
        >
          Place an order
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Place an order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Material</FormLabel>
              <Select placeholder="Select an option" onChange={handleMaterial}>
                {materialTypes.map((thisMaterial) => (
                  <Fragment key={thisMaterial}>
                    <option value={thisMaterial}>{thisMaterial}</option>
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
    </>
  );
};

FormModal.propTypes = {
  showButton: PropTypes.bool,
};

export default FormModal;
