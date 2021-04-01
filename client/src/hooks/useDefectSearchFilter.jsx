import { useState } from 'react';

const useDefectSearchFilter = () => {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleFilter = (type, status) => {
    setType(type);
    setStatus(status);
  };

  const filterDefects = (defects) => {
    return defects.filter(
      (defect) =>
        (!type ? true : defect.type === type) && (!status ? true : defect.status === status)
    );
  };

  const handleSearch = (input) => {
    setSearchInput(input);
  };

  const searchDefects = (defects) => {
    return defects.filter((defect) => {
      for (const property in defect) {
        const notWantedProperty = property === '_id' || property === '__v';
        if (
          !notWantedProperty &&
          String(defect[property]).toLowerCase().includes(searchInput.toLowerCase())
        )
          return true;
      }
      return false;
    });
  };

  const searchFilterData = (data) => {
    if (type || status) {
      data = filterDefects(data);
    }
    if (searchInput !== '') {
      data = searchDefects(data);
    }
    return data;
  };

  return { handleFilter, handleSearch, searchFilterData };
};

export default useDefectSearchFilter;
