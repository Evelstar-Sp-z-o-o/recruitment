import formatDateComponents from './formatDateComponents';

const formatTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const { day, month, year, hours, minutes } = formatDateComponents(date);

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDate;
};

export default formatTimestampToDate;
