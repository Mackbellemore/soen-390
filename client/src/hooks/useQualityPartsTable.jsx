import { useToast } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { deleteDefects, getDefects, updateDefect, getBikeDefects } from 'utils/api/defect.js';

const useQualityPartsTable = () => {
  const { isLoading, isSuccess, data, refetch } = useQuery('defects', getDefects);
  const { refetch: refetchBikeDefects } = useQuery('bikeDefects', getBikeDefects);
  const [selected, setSelected] = useState([]);
  const toast = useToast();
  const newDescription = useRef('');
  const newStatus = useRef('');
  const [Editing, setEditing] = useState('');

  const handleStatusColor = (status) => {
    switch (status) {
      case 'Solved':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Ongoing':
        return 'yellow';
    }
  };

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
      await deleteDefects(selected);
      toast({
        title: 'Deleted',
        description: 'Defects have been deleted successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setSelected([]);
      refetch();
      refetchBikeDefects();
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

  const isEditing = (_id) => {
    return _id === Editing;
  };

  const handleEdit = async () => {
    try {
      await updateDefect({
        _id: Editing,
        status: newStatus.current.value,
        description: newDescription.current.value,
      });
      toast({
        title: 'Updated',
        description: 'Defect has been updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetch();
      refetchBikeDefects();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setEditing('');
  };

  return {
    handleStatusColor,
    isSelected,
    handleSelectAllClick,
    handleOnChange,
    handleDelete,
    handleEdit,
    isEditing,
    setEditing,
    isLoading,
    isSuccess,
    data,
    selected,
    newDescription,
    newStatus,
  };
};

export default useQualityPartsTable;
