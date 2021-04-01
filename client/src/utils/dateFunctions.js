const formatDate = (date) => {
  const displayDate = new Date(date);
  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return displayDate.toLocaleDateString(undefined, dateFormat);
};

export { formatDate };
