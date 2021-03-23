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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import useRegisterForm from 'hooks/useRegisterForm.jsx';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getBikes } from 'utils/api/bikes.js';
import { createSale, getSales } from 'utils/api/sales.js';
import AboutBike from './AboutBike.jsx';

const SalesModal = ({ showButton = false }) => {
  const { isSuccess, data } = useQuery('bikes', getBikes);
  const { refetch } = useQuery('sales', getSales);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBikeId, setSelectedBikeId] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { emailRef, emailIsValidated, registerHandleEmailValidation } = useRegisterForm();
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoadingButton(true);
    try {
      await createSale({
        bikeId: selectedBikeId,
        customerEmail: emailRef.current.value,
        customerName: name,
        quantity,
      });
      refetch();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    setSelectedBikeId(undefined);
    setName(undefined);
    setQuantity(1);
    setIsLoadingButton(false);
    onClose();
  };

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onOpen}>Add Sale</Button>
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
          <ModalHeader>Add a sale</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Bike</FormLabel>
              <Select onChange={(e) => setSelectedBikeId(e.target.value)}>
                {/* <option>Select one</option> */}
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
                focusBorderColor={emailIsValidated ? 'red' : 'blue.500'}
                isInvalid={emailIsValidated}
                onChange={registerHandleEmailValidation}
                required
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Customer Name</FormLabel>
              <Input onChange={(e) => setName(e.target.value)} placeholder="Customer Name" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput min={1} defaultValue={1}>
                <NumberInputField onChange={(e) => setQuantity(e.target.value)} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            {selectedBikeId && <AboutBike bikeId={selectedBikeId} />}
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoadingButton}
              isDisabled={!(!emailIsValidated && name)}
              onClick={handleSubmit}
              colorScheme="blue"
              mr={3}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

SalesModal.propTypes = {
  showButton: PropTypes.bool,
};

export default SalesModal;
