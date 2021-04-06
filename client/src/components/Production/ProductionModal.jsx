import {
  Center,
  Button,
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
import { TextField } from '@material-ui/core';
import { Fragment } from 'react';
import useProductionModal from 'hooks/useProductionModal';

const ProductionModal = () => {
  const {
    isSuccessPart,
    dataPart,
    formStyle,
    elementStyle,
    partType,
    isOpen,
    onOpen,
    onClose,
    form,
    setForm,
    productionRef,
    colorRef,
    quantityRef,
    statusRef,
    nameRef,
    descriptionRef,
    startDate,
    endDate,
    assemblyMachineRef,
    noteRef,
    qualityRef,
    gradeRef,
    finishRef,
    weightAmountRef,
    weightTypeRef,
    handleBarRef,
    wheelRef,
    chainRef,
    frameRef,
    pedalRef,
    brakesRef,
    seatRef,
    forkRef,
    handleStartDateInput,
    handleEndDateInput,
    handleSubmit,
  } = useProductionModal();

  const formPart = (
    <>
      <FormControl isRequired style={elementStyle}>
        <FormLabel>Product</FormLabel>
        <Select placeholder="Select production" ref={productionRef}>
          {partType.map((part) => (
            <Fragment key={part}>
              <option value={part}>{part}</option>
            </Fragment>
          ))}
        </Select>
      </FormControl>
      <div style={formStyle}>
        <FormControl isRequired style={elementStyle}>
          <FormLabel>Quality</FormLabel>
          <Input ref={qualityRef} />
        </FormControl>
        <FormControl style={elementStyle}>
          <FormLabel>Grade</FormLabel>
          <Input ref={gradeRef} />
        </FormControl>
        <FormControl style={elementStyle}>
          <FormLabel>Finish</FormLabel>
          <Input ref={finishRef} />
        </FormControl>
      </div>
    </>
  );

  const formBike = (
    <>
      <div style={formStyle}>
        <FormControl isRequired style={elementStyle}>
          <FormLabel>Weight Amount</FormLabel>
          <Input ref={weightAmountRef} />
        </FormControl>
        <FormControl isRequired style={elementStyle}>
          <FormLabel>Weight Type</FormLabel>
          <Select ref={weightTypeRef}>
            <Fragment>
              <option>kg</option>
              <option>lb</option>
            </Fragment>
          </Select>
        </FormControl>
      </div>
      <div style={formStyle}>
        <FormControl style={elementStyle}>
          <FormLabel>Handle Bar</FormLabel>
          <Select ref={handleBarRef}>
            {isSuccessPart &&
              dataPart.data
                .filter((part) => part.type === 'handle_bar')
                .map((part) => (
                  <Fragment key={part._id}>
                    <option value={part._id}>{part.name}</option>
                  </Fragment>
                ))}
          </Select>
        </FormControl>
        <FormControl style={elementStyle}>
          <FormLabel>Wheels</FormLabel>
          <Select ref={wheelRef}>
            {isSuccessPart &&
              dataPart.data
                .filter((part) => part.type === 'wheels')
                .map((part) => (
                  <Fragment key={part._id}>
                    <option value={part._id}>{part.name}</option>
                  </Fragment>
                ))}
          </Select>
        </FormControl>
      </div>
      <div style={formStyle}>
        <FormControl style={elementStyle}>
          <FormLabel>Chain</FormLabel>
          <Select ref={chainRef}>
            {isSuccessPart &&
              dataPart.data
                .filter((part) => part.type === 'chain')
                .map((part) => (
                  <Fragment key={part._id}>
                    <option value={part._id}>{part.name}</option>
                  </Fragment>
                ))}
          </Select>
        </FormControl>
        <FormControl style={elementStyle}>
          <FormLabel>Frame</FormLabel>
          <Select ref={frameRef}>
            {isSuccessPart &&
              dataPart.data
                .filter((part) => part.type === 'frame')
                .map((part) => (
                  <Fragment key={part._id}>
                    <option value={part._id}>{part.name}</option>
                  </Fragment>
                ))}
          </Select>
        </FormControl>
        <FormControl style={elementStyle}>
          <FormLabel>Pedal</FormLabel>
          <Select ref={pedalRef}>
            {isSuccessPart &&
              dataPart.data
                .filter((part) => part.type === 'pedal')
                .map((part) => (
                  <Fragment key={part._id}>
                    <option value={part._id}>{part.name}</option>
                  </Fragment>
                ))}
          </Select>
        </FormControl>
      </div>
      <div style={formStyle}>
        <FormControl style={elementStyle}>
          <FormLabel>Brakes</FormLabel>
          <Select ref={brakesRef}>
            {isSuccessPart &&
              dataPart.data
                .filter((part) => part.type === 'brakes')
                .map((part) => (
                  <Fragment key={part._id}>
                    <option value={part._id}>{part.name}</option>
                  </Fragment>
                ))}
          </Select>
        </FormControl>
        <FormControl style={elementStyle}>
          <FormLabel>Seat</FormLabel>
          <Select ref={seatRef}>
            {isSuccessPart &&
              dataPart.data
                .filter((part) => part.type === 'seat')
                .map((part) => (
                  <Fragment key={part._id}>
                    <option value={part._id}>{part.name}</option>
                  </Fragment>
                ))}
          </Select>
        </FormControl>
        <FormControl style={elementStyle}>
          <FormLabel>Fork</FormLabel>
          <Select ref={forkRef}>
            {isSuccessPart &&
              dataPart.data
                .filter((part) => part.type === 'fork')
                .map((part) => (
                  <Fragment key={part._id}>
                    <option value={part._id}>{part.name}</option>
                  </Fragment>
                ))}
          </Select>
        </FormControl>
      </div>
    </>
  );

  return (
    <>
      <Center mt={4}>
        <Button onClick={onOpen}>Produce</Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Production</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Button mr={3} onClick={() => setForm('Part')}>
              Part
            </Button>
            <Button onClick={() => setForm('Bike')}>Bike</Button>
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
                <Input ref={nameRef} />
              </FormControl>
              <FormControl style={elementStyle}>
                <FormLabel>Description</FormLabel>
                <Input ref={descriptionRef} />
              </FormControl>
            </div>
            {form === 'Part' ? formPart : formBike}
            <div style={formStyle}>
              <FormControl isRequired style={elementStyle}>
                <FormLabel>Color</FormLabel>
                <Input ref={colorRef} />
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
              <Input ref={assemblyMachineRef} />
            </FormControl>
            <FormControl style={elementStyle}>
              <FormLabel>Note</FormLabel>
              <Textarea placeholder="Additional Note" ref={noteRef} />
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
export default ProductionModal;
