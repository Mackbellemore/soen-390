import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import useExportCSV from 'hooks/useExportCSV.jsx';

const ExportFiles = ({ section, data }) => {
  const { handleExportCSV } = useExportCSV(section, data);

  return (
    <div>
      <Menu placement="right-start" isLazy="true">
        <MenuButton as={Button}>Export »</MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleExportCSV()}>.CSV</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

ExportFiles.propTypes = {
  section: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default ExportFiles;
