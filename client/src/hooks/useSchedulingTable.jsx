import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { deleteSchedulings, getSchedulings } from 'utils/api/schedulings.js';

const useSchedulingTable = () => {
  const { isLoading, isSuccess, data, refetch } = useQuery('scheduling', getSchedulings);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const toast = useToast();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = data.data.map((n) => n._id);
      setSelected(newSelecteds);
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
      await deleteSchedulings(selected);
      toast({
        title: 'Deleted',
        description: 'Scheduling have been deleted successfully',
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

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    handleSelectAllClick,
    handleOnChange,
    handleDelete,
    isLoading,
    isSuccess,
    page,
    rowsPerPage,
    data,
    selected,
  };
};

export default useSchedulingTable;
