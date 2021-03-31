const formatDate = (date) => {
  const displayDate = new Date(date);
  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return displayDate.toLocaleDateString(undefined, dateFormat);
};

const formatDateAndTime = (dateTime) => {
  const currentDatetime = new Date(dateTime);
  const formattedDate =
    currentDatetime.getFullYear() +
    '-' +
    (currentDatetime.getMonth() + 1) +
    '-' +
    currentDatetime.getDate() +
    ' ' +
    currentDatetime.getHours() +
    ':' +
    currentDatetime.getMinutes() +
    ':' +
    currentDatetime.getSeconds();

  return formattedDate;
};

export { formatDate, formatDateAndTime };
