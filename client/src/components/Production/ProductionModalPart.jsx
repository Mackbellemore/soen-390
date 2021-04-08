import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { Fragment, forwardRef } from 'react';
import useProductionModal from 'hooks/useProductionModal';

const ProductionModalPart = forwardRef((props, partRefs) => {
  const { formStyle, elementStyle, isSuccessPartType, partType } = useProductionModal();
  const { productionRef, qualityRef, gradeRef, finishRef } = partRefs;

  return (
    <>
      <FormControl isRequired style={elementStyle}>
        <FormLabel>Product</FormLabel>
        <Select placeholder="Select production" ref={productionRef}>
          {isSuccessPartType &&
            Object.keys(partType.data).map((part) => (
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
        <FormControl isRequired style={elementStyle}>
          <FormLabel>Grade</FormLabel>
          <Input ref={gradeRef} />
        </FormControl>
        <FormControl isRequired style={elementStyle}>
          <FormLabel>Finish</FormLabel>
          <Input ref={finishRef} />
        </FormControl>
      </div>
    </>
  );
});

ProductionModalPart.displayName = 'ProductionModalPart';

export default ProductionModalPart;
