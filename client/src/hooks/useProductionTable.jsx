import { useQuery } from 'react-query';
import { getProductions } from 'utils/api/productions';
import { useState } from 'react';

const useProductionTable = () => {
  const {
    isLoading: isLoadingProduction,
    isSuccess: isSuccessProduction,
    data: dataProduction,
  } = useQuery('productions', getProductions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (date) => {
    const displayDate = new Date(date);
    const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return displayDate.toLocaleDateString(undefined, dateFormat);
  };

  return {
    isLoadingProduction,
    isSuccessProduction,
    dataProduction,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    formatDate,
  };
};

export default useProductionTable;
