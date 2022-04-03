const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const getLastWeekDate = () => {
  const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const convertDate = (date) => {
  const newDate = new Date(date);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();

  return `${months[month]} ${day}, ${year}`;
};

export { getCurrentDate, getLastWeekDate, convertDate };
