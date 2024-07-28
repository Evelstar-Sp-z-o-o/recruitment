const formatDateToTimestamp = () => {
  const today = new Date();

  const unixTimestamp = Math.floor(today.getTime() / 1000);

  return unixTimestamp;
};

export default formatDateToTimestamp;
