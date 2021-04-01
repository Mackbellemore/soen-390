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
} from '@chakra-ui/react';
import useOrderForm from 'hooks/useOrderForm.jsx';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';
import AsyncSelect from 'react-select/async';

const FormModal = ({ showButton = false }) => {
  // TODO: use the endpoint to get this constant list of materials rather than hard coding
  const materialTypes = ['rubber', 'aluminum', 'steel', 'copper', 'plastic', 'leather'];
  const {
    handleMaterial,
    handleSubmit,
    handleDeliveryDateInput,
    handleShippingDateInput,
    handleLocationInput,
    handleLocationSelect,
    manufacturer,
    location,
    note,
    quantityRef,
    onOrderModalClose,
    onOrderModalOpen,
    isOrderModalOpen,
    material,
    deliveryDate,
    shippingDate,
  } = useOrderForm();

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onOrderModalOpen}>Place an order</Button>
        </Center>
      ) : (
        <Button
          margin={1}
          colorScheme="blue"
          variant="solid"
          leftIcon={<SmallAddIcon />}
          onClick={onOrderModalOpen}
        >
          Place an order
        </Button>
      )}
      <Modal isOpen={isOrderModalOpen} onClose={onOrderModalClose}>
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
              <NumberInput min={1} defaultValue={1}>
                <NumberInputField ref={quantityRef} />
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
              <AsyncSelect
                cacheOptions
                loadOptions={handleLocationInput}
                onInputChange={handleLocationInput}
                onChange={handleLocationSelect}
                isClearable={true}
                value={location}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Shipping Date</FormLabel>
              <TextField onChange={handleShippingDateInput} type="date" value={shippingDate} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Delivery Date</FormLabel>
              <TextField onChange={handleDeliveryDateInput} type="date" value={deliveryDate} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Note to the manufacturer</FormLabel>
              <Textarea placeholder="Note" ref={note} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isDisabled={!(material && deliveryDate && shippingDate && location)}
            >
              Submit
            </Button>
            <Button onClick={onOrderModalOpen}>Cancel</Button>
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
