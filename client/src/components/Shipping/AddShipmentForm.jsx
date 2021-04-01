import { SmallAddIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import useShipmentForm from 'hooks/useShipmentForm.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import AsyncSelect from 'react-select/async';

const AddShipmentForm = ({ showButton = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleCompanyInput,
    handleLocationInput,
    handleDeliveryDateInput,
    handleShippingDateInput,
    handleSubmit,
    handleLocationSelect,
    isLoadingButton,
    status,
    company,
    location,
    deliveryDate,
    shippingDate,
  } = useShipmentForm();

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onOpen}>Add Shipment</Button>
        </Center>
      ) : (
        <IconButton
          colorScheme="blue"
          variant="outline"
          aria-label="add"
          float="right"
          m={2}
          icon={<SmallAddIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Shipment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Company</FormLabel>
              <Input onChange={handleCompanyInput} value={company} />
            </FormControl>

            <FormControl isRequired mt={4}>
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
              <FormLabel>Shipment Status</FormLabel>
              <Select ref={status}>
                <option>Ordered</option>
                <option>Packaged</option>
              </Select>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Shipping Date</FormLabel>
              <TextField value={shippingDate} onChange={handleShippingDateInput} type="date" />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Delivery Date</FormLabel>
              <TextField value={deliveryDate} onChange={handleDeliveryDateInput} type="date" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoadingButton}
              isDisabled={!(company && location && shippingDate && deliveryDate && status)}
              onClick={handleSubmit}
              colorScheme="blue"
              mr={3}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

AddShipmentForm.propTypes = {
  showButton: PropTypes.bool,
};

export default observer(AddShipmentForm);
