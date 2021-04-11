import {
  Center,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select,
  Textarea,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { TextField } from '@material-ui/core';
import { Fragment, useEffect } from 'react';
import useProductionModal from 'hooks/useProductionModal';
import ProductionModalPart from 'components/Production/ProductionModalPart.jsx';
import ProductionModalBike from 'components/Production/ProductionModalBike.jsx';
import PropTypes from 'prop-types';

const ProductionModal = ({ showButton = false }) => {
  const {
    formStyle,
    elementStyle,
    isOpen,
    onOpen,
    onClose,
    form,
    colorRef,
    quantityRef,
    statusRef,
    nameRef,
    descriptionRef,
    startDate,
    endDate,
    assemblyMachineRef,
    noteRef,
    profitMarginRef,
    partRefs,
    bikeRefs,
    styleBtn,
    isEmptyField,
    onClickPart,
    onClickBike,
    handleChange,
    handleStartDateInput,
    handleEndDateInput,
    handleSubmit,
  } = useProductionModal();

  useEffect(() => {
    handleChange();
  }, [form, startDate, endDate, handleChange]);

  return (
    <>
      {showButton ? (
        <Center mt={4}>
          <Button onClick={onOpen}>Produce</Button>
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
          <ModalHeader>Production for {form}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div style={styleBtn}>
              <Button onClick={form === 'Bike' ? onClickPart : onClickBike} colorScheme="teal">
                {form === 'Bike' ? 'Part' : 'Bike'}
              </Button>
            </div>
            <div style={formStyle}>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>Status</FormLabel>
                <Select ref={statusRef}>
                  <Fragment>
                    <option>Ongoing</option>
                    <option>Complete</option>
                    <option>Idle</option>
                    <option>Cancelled</option>
                  </Fragment>
                </Select>
              </FormControl>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>Name</FormLabel>
                <Input ref={nameRef} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>Description</FormLabel>
                <Input ref={descriptionRef} onChange={handleChange} />
              </FormControl>
            </div>
            {form === 'Part' ? (
              <ProductionModalPart ref={partRefs} handleChange={handleChange} />
            ) : (
              <ProductionModalBike ref={bikeRefs} handleChange={handleChange} />
            )}
            <div style={formStyle}>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>Color</FormLabel>
                <Input ref={colorRef} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>Quantity</FormLabel>
                <NumberInput min={1} defaultValue={1}>
                  <NumberInputField ref={quantityRef} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>Profit Margin</FormLabel>
                <NumberInput min={1.1} defaultValue={1.1} step={0.1}>
                  <NumberInputField ref={profitMarginRef} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </div>
            <div style={formStyle}>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>Start Date</FormLabel>
                <TextField onChange={handleStartDateInput} type="date" value={startDate} />
              </FormControl>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>End Date</FormLabel>
                <TextField onChange={handleEndDateInput} type="date" value={endDate} />
              </FormControl>
            </div>
            <FormControl isRequired style={elementStyle}>
              <FormLabel>Assembly Machine</FormLabel>
              <Input ref={assemblyMachineRef} onChange={handleChange} />
            </FormControl>
            <FormControl style={elementStyle}>
              <FormLabel>Note</FormLabel>
              <Textarea placeholder="Additional Note" ref={noteRef} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} disabled={isEmptyField} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ProductionModal.propTypes = {
  showButton: PropTypes.bool,
};

export default ProductionModal;
