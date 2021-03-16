import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

const ExportFiles = ({ section, data }) => {
    const handleExportCSV = () => {
    var dateTime = getDateTime();
    var arrData = data;

    arrData.forEach(function (currentItem) {
      delete currentItem['_id'];
    });

    var CSV = '';

    // CSV title
    var row = '';
    for (var index in arrData[0]) row += index + ',';
    row = row.slice(0, -1);
    CSV += row + '\r\n';

    // CSV data
    for (var i = 0; i < arrData.length; i++) {
      var row = '';
      for (var index in arrData[i]) row += '"' + arrData[i][index] + '",';
      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }

    if (CSV === '') {
      alert('Invalid data');
      return;
    }

    var fileName = ('ERP_export_' + section + '_' + dateTime).replace(/ /g, '_');

    var link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // set the visibility hidden so it will not effect on your web-layout
    link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDateTime = () => {
    var today = new Date();
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
          <MenuItem disabled>
            .PDF
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default ExportFiles;
