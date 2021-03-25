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
import useSchedulingForm from 'hooks/useSchedulingForm.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useQuery } from 'react-query';
import { getPartMaterialList } from 'utils/api/parts.js';
import Loader from 'components/common/Loader.jsx';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { getMachines } from 'utils/api/machines.js';

const AddSchedulingModal = ({ showButton = false }) => {
  const { isLoading, data: partsData } = useQuery('parts/materialList', getPartMaterialList);
  const { isLoading: isLoadingMachine, data: machineData } = useQuery('machine', getMachines);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleQuantityInput,
    handleCostInput,
    handleOperatingTime,
    handleSubmit,
    isLoadingButton,
    quantity,
    cost,
    operatingTime,
    partType,
    machineName,
  } = useSchedulingForm();

  if (isLoading || isLoadingMachine) {
    return <Loader />;
  }

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onOpen}>Add Scheduling</Button>
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
          <ModalHeader>Add a new schedule</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Part Type</FormLabel>
              <Select placeholder="Select a part" ref={partType}>
                {Object.keys(partsData.data).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Machine</FormLabel>
              <Select placeholder="Select a machine" ref={machineName}>
                {Object.values(machineData.data).map((val) => (
                  <option key={val.machineName} value={val.machineName}>
                    {val.machineName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                onChange={handleQuantityInput}
                value={quantity}
                placeholder="Quantity"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Cost</FormLabel>
              <Input type="number" onChange={handleCostInput} value={cost} placeholder="Cost" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Operating Time</FormLabel>
              <DateTimePicker onChange={handleOperatingTime} value={operatingTime} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoadingButton}
              isDisabled={!partType && !machineName && !quantity && !cost && !operatingTime}
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

AddSchedulingModal.propTypes = {
  showButton: PropTypes.bool,
};

export default AddSchedulingModal;
