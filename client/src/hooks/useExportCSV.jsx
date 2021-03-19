const useExportCSV = (section, data) => {
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
      let dataRow = '';
      for (const header in headerArr) {
        const str = arrData[i][headerArr[header]];
        if (str !== undefined) dataRow += '"' + arrData[i][headerArr[header]] + '",';
      }
      dataRow = dataRow.slice(0, dataRow.length - 1);
      finalText += dataRow + '\r\n';
    }

    if (finalText === '\r\n') {
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

  return { handleExportCSV };
};

export default useExportCSV;
