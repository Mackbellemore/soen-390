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
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { createDefect, getDefects } from 'utils/api/defect.js';

const AddDefectModal = ({ showButton = false }) => {
  const { refetch } = useQuery('defects', getDefects);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [partName, setPartName] = useState('');
  const type = useRef('');
  const status = useRef('');
  const description = useRef('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const toast = useToast();

  const handlePartNameInput = (e) => {
    setPartName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);
    try {
      await createDefect({
        partName: partName,
        type: type.current.value,
        status: status.current.value,
        description: description.current.value,
      });
      toast({
        title: 'Request Sent',
        description: 'Defect has been created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
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
    setIsLoadingButton(false);
  };

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
