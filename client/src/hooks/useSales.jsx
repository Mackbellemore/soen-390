import { useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { createSale, getSales, updateSale } from 'utils/api/sales.js';
import { getOneBike } from 'utils/api/bikes.js';
import { createShipment } from 'utils/api/shippings.js';
import { sendEmail } from 'utils/api/system.js';
import { RootStoreContext } from 'stores/stores.jsx';
import { formatDate } from 'utils/dateFunctions.js';
import { getSearchResults } from 'utils/api/mapbox.js';
import { useDebouncedCallback } from 'use-debounce';

const useSales = (sale) => {
  const {
    isOpen: isInfoModalOpen,
    onOpen: onInfoModalOpen,
    onClose: onInfoModalClose,
  } = useDisclosure();
  const toast = useToast();
  const { refetch } = useQuery('sales', getSales);
  const { userStore } = useContext(RootStoreContext);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [name, setName] = useState(undefined);
  const emailRef = useRef('');
  const [selectedBikeId, setSelectedBikeId] = useState(undefined);
  const quantityRef = useRef(1);
  const [bikeMaxStock, setBikeMaxStock] = useState(1);
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [location, setLocation] = useState('');

  const {
    isOpen: isSaleModalOpen,
    onOpen: onSaleModalOpen,
    onClose: onSaleModalClose,
  } = useDisclosure();
  const { data: bikeData, isSuccess } = useQuery(`bikes/${selectedBikeId}`, () => {
    if (selectedBikeId !== undefined) getOneBike(selectedBikeId);
  });

  useEffect(() => {
    if (isSuccess && selectedBikeId !== undefined) setBikeMaxStock(bikeData.data.stock);
  }, [bikeData?.data.stock, isSuccess, selectedBikeId]);

  const handleStatusColor = (status) => {
    switch (status) {
      case 'Fulfilled':
        return 'green';
      case 'Processing':
        return 'yellow';
      case 'Cancelled':
        return 'red';
    }
  };

  const handleLocationInput = useDebouncedCallback((e) => {
    const searchLocation = e;
    if (searchLocation) {
      return getSearchResults(searchLocation);
    }
  }, 500);

  const handleLocationSelect = (e) => {
    e ? setLocation(e) : setLocation(null);
  };
  const handleDeliveryDateInput = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleShippingDateInput = (e) => {
    setShippingDate(e.target.value);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const { data: newSaleInfo } = await updateSale({
        _id: sale._id,
        status: newStatus,
        bikeId: sale.bikeId,
      });
      await sendEmail({
        to: [userStore.email, newSaleInfo.customerEmail],
        subject: `ERP Sales: Sale ${newSaleInfo._id} Update`,
        emailBody: `Information about the sale update\n\nSale Id: ${newSaleInfo._id} \nCustomer: ${newSaleInfo.customerName} \nBike Id: ${newSaleInfo.bikeId} \nQuantity: ${newSaleInfo.quantity} \nSale Status: ${newSaleInfo.status}`,
      });
      toast({
        title: 'Sale Status Update',
        description: 'The sale have been updated',
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
    onInfoModalClose();
  };

  const handleSubmit = async () => {
    setIsLoadingButton(true);
    try {
      const { data: saleInfo } = await createSale({
        bikeId: selectedBikeId,
        customerEmail: emailRef.current.value,
        customerName: name,
        quantity: quantityRef.current.value,
      });
      const { data: shpmtInfo } = await createShipment({
        company: name,
        location: location.label,
        status: 'Ordered',
        deliveryDate: deliveryDate,
        shippingDate: shippingDate,
      });
      await sendEmail({
        to: [userStore.email, saleInfo.customerEmail],
        subject: `ERP Sales: Sale ${saleInfo._id} Placed`,
        emailBody: `Information about the sale\n\nSale Id: ${saleInfo._id} \nCustomer: ${saleInfo.customerName} \nBike Id: ${saleInfo.bikeId} \nQuantity: ${saleInfo.quantity} \nSale Status: ${saleInfo.status}`,
      });
      await sendEmail({
        to: [userStore.email, saleInfo.customerEmail],
        subject: `ERP Shipping: New Shipment ${shpmtInfo._id}`,
        emailBody: `Information about the new shipment\n\nSale Id: ${saleInfo._id} \nCompany: ${
          shpmtInfo.company
        } \nLocation: ${shpmtInfo.location} \nStatus: ${
          shpmtInfo.status
        } \nDelivery Date: ${formatDate(shpmtInfo.deliveryDate)} \nShipping Date: ${formatDate(
          shpmtInfo.shippingDate
        )}`,
      });
      toast({
        title: 'Sale/Shipment Placed',
        description: 'The sale and shipment have been placed',
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
    setSelectedBikeId(undefined);
    setName(undefined);
    setIsLoadingButton(false);
    onSaleModalClose();
  };

  return {
    isInfoModalOpen,
    onInfoModalOpen,
    onInfoModalClose,
    handleStatusColor,
    handleStatusChange,
    handleSubmit,
    handleDeliveryDateInput,
    handleShippingDateInput,
    handleLocationInput,
    handleLocationSelect,
    isSaleModalOpen,
    onSaleModalOpen,
    onSaleModalClose,
    emailRef,
    setSelectedBikeId,
    setName,
    selectedBikeId,
    isLoadingButton,
    name,
    quantityRef,
    bikeMaxStock,
    deliveryDate,
    shippingDate,
    location,
  };
};

export default useSales;
