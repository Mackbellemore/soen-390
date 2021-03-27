import { useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { createShipment, getShippings } from 'utils/api/shippings.js';

const useShipmentForm = () => {
  const { refetch } = useQuery('shippings', getShippings);

  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const status = useRef('');
  const toast = useToast();

  const handleCompanyInput = (e) => {
    setCompany(e.target.value);
  };

  const handleLocationInput = (e) => {
    setLocation(e.target.value);
  };

  const handleDeliveryDateInput = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleShippingDateInput = (e) => {
    setShippingDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);
    try {
      await createShipment({
        company: company,
        location: location,
        status: status.current.value,
        deliveryDate: deliveryDate,
        shippingDate: shippingDate,
      });
      toast({
        title: 'Shipment Creation',
        description: 'Shipment has been created successfully',
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

  return {
    handleCompanyInput,
    handleLocationInput,
    handleDeliveryDateInput,
    handleShippingDateInput,
    handleSubmit,
    isLoadingButton,
    status,
    company,
    location,
    deliveryDate,
    shippingDate,
  };
};

export default useShipmentForm;
