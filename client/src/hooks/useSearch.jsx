import { useState } from 'react';

const useSearch = () => {
  const [searchInput, setSearchInput] = useState('');

  const objectSearch = (obj) => {
    for (const property in obj) {
      const notWantedProperty = property === '_id' || property === '__v';
      if (
        !notWantedProperty &&
        String(obj[property]).toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return true;
      } else if (typeof obj[property] === 'object' && obj[property] !== null) {
        return objectSearch(obj[property]);
      }
    }
    return false;
  };

  const searchData = (data) => {
    if (searchInput !== '') {
      return data.filter((obj) => objectSearch(obj));
    }
    return data;
  };

  return { setSearchInput, searchData };
};

export default useSearch;
