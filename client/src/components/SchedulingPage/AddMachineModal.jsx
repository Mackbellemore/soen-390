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
  useDisclosure,
} from '@chakra-ui/react';
import useMachineForm from 'hooks/useMachineForm';
import PropTypes from 'prop-types';
import React from 'react';

const AddMachineModal = ({ showButton = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleMachineName,
    handleDuration,
    handleSubmit,
    isLoadingButton,
    machineName,
    duration,
  } = useMachineForm();

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onOpen}>Add Machine</Button>
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
          <ModalHeader>Add a new machine</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Machine name</FormLabel>
              <Input onChange={handleMachineName} value={machineName} placeholder="Machine Name" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Duration (minutes)</FormLabel>
              <Input
                type="number"
                onChange={handleDuration}
                value={duration}
                placeholder="Duration"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoadingButton}
              isDisabled={!(machineName && duration)}
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

AddMachineModal.propTypes = {
  showButton: PropTypes.bool,
};

export default AddMachineModal;
