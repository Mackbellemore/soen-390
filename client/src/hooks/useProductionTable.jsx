import { useQuery } from 'react-query';
import { getProductions } from 'utils/api/productions';
import { getParts } from 'utils/api/parts';
import { getBikes } from 'utils/api/bikes';
import usePagination from 'hooks/usePagination';
import { formatDate } from 'utils/dateFunctions';

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
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();

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
    rowsPerPage,
    findEntity,
    handleChangePage,
    handleChangeRowsPerPage,
    formatDate,
  };
};

export default useProductionTable;
