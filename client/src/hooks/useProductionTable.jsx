import { useQuery } from 'react-query';
import { getProductions } from 'utils/api/productions';
import { getParts } from 'utils/api/parts';
import { getBikes } from 'utils/api/bikes';

import { useState } from 'react';

const useProductionTable = () => {
  const {
    isLoading: isLoadingProduction,
    isSuccess: isSuccessProduction,
    data: dataProduction,
  } = useQuery('productions', getProductions);
  const { isLoading: isLoadingPart, isSuccess: isSuccessPart, data: dataPart } = useQuery(
    'parts',
    getParts
  );
  const { isLoading: isLoadingBike, isSuccess: isSuccessBike, data: dataBike } = useQuery(
    'bikes',
    getBikes
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const findEntity = (type, id) => {
    if (type === 'Part') {
      return dataPart.data.find((part) => {
        return part._id === id;
      });
    }
    if (type === 'Bike') {
      return dataBike.data.find((bike) => {
        return bike._id === id;
      });
    }
  };

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
    isLoadingPart,
    isSuccessPart,
    dataPart,
    isLoadingBike,
    isSuccessBike,
    dataBike,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    findEntity,
    handleChangePage,
    handleChangeRowsPerPage,
    formatDate,
  };
};

export default useProductionTable;
