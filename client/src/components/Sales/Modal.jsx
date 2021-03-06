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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from '@chakra-ui/react';
import useEmailValidation from 'hooks/useEmailValidation.jsx';
import useSales from 'hooks/useSales.jsx';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getBikes } from 'utils/api/bikes.js';
import AboutBike from './AboutBike.jsx';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import AsyncSelect from 'react-select/async';

const SalesModal = ({ showButton = false }) => {
  const { isSuccess, data } = useQuery('bikes', getBikes);
  const {
    handleSubmit,
    isSaleModalOpen,
    onSaleModalOpen,
    onSaleModalClose,
    handleDeliveryDateInput,
    handleShippingDateInput,
    handleLocationInput,
    handleLocationSelect,
    emailRef,
    setSelectedBikeId,
    setName,
    selectedBikeId,
    isLoadingButton,
    name,
    quantityRef,
    bikeMaxStock,
    deliveryDate,
    shippingDate,
    location,
  } = useSales();
  const { isValidEmail, handleEmailInput } = useEmailValidation();

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onSaleModalOpen}>Add Sale</Button>
        </Center>
      ) : (
        <IconButton
          colorScheme="blue"
          variant="outline"
          aria-label="add"
          float="right"
          m={2}
          icon={<SmallAddIcon />}
          onClick={onSaleModalOpen}
        />
      )}
      <Modal isOpen={isSaleModalOpen} onClose={onSaleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a sale</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Bike</FormLabel>
              <Select onChange={(e) => setSelectedBikeId(e.target.value)} defaultValue="default">
                <option disabled value="default">
                  Select
                </option>
                {isSuccess &&
                  data.data
                    .filter((bike) => bike.stock > 0)
                    .map((bike) => (
                      <option key={bike._id} value={bike._id}>
                        {bike.name}
                      </option>
                    ))}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Customer Email</FormLabel>
              <Input
                placeholder="Customer Email"
                type="email"
                ref={emailRef}
                focusBorderColor={isValidEmail ? 'blue.500' : 'red'}
                isInvalid={!isValidEmail}
                onChange={handleEmailInput}
                required
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Customer Name</FormLabel>
              <Input onChange={(e) => setName(e.target.value)} placeholder="Customer Name" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput min={1} defaultValue={1} max={bikeMaxStock}>
                <NumberInputField ref={quantityRef} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
              <FormLabel>Shipping Date</FormLabel>
              <TextField onChange={handleShippingDateInput} type="date" value={shippingDate} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Delivery Date</FormLabel>
              <TextField onChange={handleDeliveryDateInput} type="date" value={deliveryDate} />
            </FormControl>
            {selectedBikeId && <AboutBike bikeId={selectedBikeId} />}
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoadingButton}
              isDisabled={!(isValidEmail && name && shippingDate && deliveryDate && location)}
              onClick={handleSubmit}
              colorScheme="blue"
              mr={3}
            >
              Submit
            </Button>
            <Button onClick={onSaleModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

SalesModal.propTypes = {
  showButton: PropTypes.bool,
};

export default observer(SalesModal);
