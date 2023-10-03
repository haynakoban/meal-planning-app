export const formatDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const startFormatted = new Intl.DateTimeFormat('en-US', options).format(
    start
  );
  const endFormatted = new Intl.DateTimeFormat('en-US', options).format(end);

  return {
    start: startFormatted,
    end: endFormatted,
  };
};
