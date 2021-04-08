const formatDate = (date) => {
  const displayDate = new Date(date);
  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return displayDate.toLocaleDateString(undefined, dateFormat);
};

const formatDateAndTime = (dateTime) => {
  const currentDatetime = new Date(dateTime);
  const formattedDate = currentDatetime.toLocaleString('en-Ca', { timeZone: 'UTC' });
  return formattedDate;
};

export { formatDate, formatDateAndTime };
