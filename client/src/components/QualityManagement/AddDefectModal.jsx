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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import useDefectForm from 'hooks/useDefectForm.jsx';
import PropTypes from 'prop-types';
import React from 'react';

const AddDefectModal = ({ showButton = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handlePartNameInput,
    handleSubmit,
    isLoadingButton,
    type,
    status,
    description,
    partName,
  } = useDefectForm();

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onOpen}>Add Defect</Button>
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
          <ModalHeader>Add a new Defect</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Part Name</FormLabel>
              <Input onChange={handlePartNameInput} value={partName} placeholder="Part name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Defect Type</FormLabel>
              <Select ref={type}>
                <option>Broken</option>
                <option>Reparable</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Defect Status</FormLabel>
              <Select ref={status}>
                <option>Solved</option>
                <option>Pending</option>
                <option>Ongoing</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea ref={description} placeholder="Description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoadingButton}
              isDisabled={!partName}
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

AddDefectModal.propTypes = {
  showButton: PropTypes.bool,
};

export default AddDefectModal;
