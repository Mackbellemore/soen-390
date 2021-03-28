import { useToast } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { getShippings, deleteShipment, updateShipmentStatus } from 'utils/api/shippings.js';
import { MapContext } from 'react-map-gl';
import { getShipment } from 'utils/shippingFunctions.js';
import { mapLayerID, shippingStatesHide } from 'constants.js';

const useShippingTable = () => {
  const { isLoading, isSuccess, data, refetch } = useQuery('shippings', getShippings);
  const { map } = useContext(MapContext);
  const [currentRow, setCurrentRow] = useState('');
  const [selected, setSelected] = useState([]);

  const toast = useToast();

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = data.data.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleOnChange = (e, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteShipment(selected);
      toast({
        title: 'Shipment Deletion',
        description: 'Shipment have been deleted successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setSelected([]);
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
  };

  const handleShpmtStateChange = async (e) => {
    if (map._fullyLoaded) {
      try {
        await updateShipmentStatus({
          ...getShipment(data.data, currentRow),
          status: e.currentTarget.value,
        });
        toast({
          title: 'Shipment Status Update',
          description: 'Shipment have been updated successfully',
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
    }
  };

  const handleHover = (e, eType) => {
    if (map._fullyLoaded && !isLoading && data) {
      data.data.forEach((shpmt) => {
        const destId = String(shpmt._id);
        const focusId = destId === e.currentTarget.id;
        const hideStatus = shippingStatesHide.includes(shpmt.status);

        if (eType === 'over') {
          map.setLayoutProperty(
            mapLayerID + destId,
            'visibility',
            !focusId || hideStatus ? 'none' : 'visible'
          );
        }

        if (eType === 'out') {
          map.setLayoutProperty(mapLayerID + destId, 'visibility', hideStatus ? 'none' : 'visible');
        }
      });
      setCurrentRow(e.currentTarget.id);
    }
  };

  return {
    isSelected,
    handleSelectAllClick,
    handleOnChange,
    handleDelete,
    handleShpmtStateChange,
    handleHover,
    isLoading,
    isSuccess,
    data,
    selected,
    refetch,
  };
};

export default useShippingTable;
