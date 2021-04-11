import {
  FormControl,
  FormLabel,
  Select,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Fragment, forwardRef } from 'react';
import useProductionModal from 'hooks/useProductionModal';

const ProductionModalBike = forwardRef((props, bikeRefs) => {
  const { isSuccessPart, dataPart, formStyle, elementStyle } = useProductionModal();

  const {
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
  } = bikeRefs;

  return (
    <>
      <div style={formStyle}>
        <FormControl isRequired style={elementStyle}>
          <FormLabel>Weight Amount</FormLabel>
          <NumberInput min={1} defaultValue={1}>
            <NumberInputField ref={weightAmountRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
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
                .filter((part) => part.type === 'handle_bar' && part.stock > 0)
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
                .filter((part) => part.type === 'wheels' && part.stock > 0)
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
                .filter((part) => part.type === 'chain' && part.stock > 0)
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
                .filter((part) => part.type === 'frame' && part.stock > 0)
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
                .filter((part) => part.type === 'pedal' && part.stock > 0)
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
                .filter((part) => part.type === 'brakes' && part.stock > 0)
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
                .filter((part) => part.type === 'seat' && part.stock > 0)
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
                .filter((part) => part.type === 'fork' && part.stock > 0)
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
});

ProductionModalBike.displayName = 'ProductionModalBike';

export default ProductionModalBike;
