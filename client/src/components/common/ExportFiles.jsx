import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

const ExportFiles = ({ section, data }) => {
  const handleExportCSV = () => {
    const dateTime = getDateTime();
    const arrData = data;

    arrData.forEach(function (currentItem) {
      delete currentItem._id;
      delete currentItem.__v;
    });
    
    // TO-DO: add filter for table col after all the pages are created.

    let finalText = '';
    const headerArr = [];

    // CSV title
    let row = '';
    for (const index in arrData[0]) {
      headerArr.push(index);
      row += index + ',';
    }

    row = row.slice(0, -1);
    finalText += row + '\r\n';

    // CSV data
    for (let i = 0; i < arrData.length; i++) {
      let row = '';
      for (const header in headerArr) {
        const str = arrData[i][headerArr[header]];
        if (str !== undefined) row += '"' + arrData[i][headerArr[header]] + '",';
      }
      row = row.slice(0, row.length - 1);
      finalText += row + '\r\n';
    }

    if (finalText === '') {
      alert('Invalid data to export');
      return;
    }

    const fileName = ('ERP_export_' + section + '_' + dateTime).replace(/ /g, '_');

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + escape(finalText);

    // set the visibility hidden so it will not effect on your web-layout
    link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDateTime = () => {
    const today = new Date();
    return (
      today.getFullYear() +
      '' +
      (today.getMonth() + 1) +
      '' +
      today.getDate() +
      '' +
      today.getHours() +
      '' +
      today.getMinutes() +
      '' +
      today.getSeconds()
    );
  };

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
