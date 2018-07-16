export function formatDate(date) {
  const dueDate = new Date(date);
  const year = dueDate.getFullYear();
  let month = dueDate.getMonth();
  let day = dueDate.getDate();

  const monthsNames = [
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
    "December"
  ];

  month = monthsNames[month];

  if (day.toString().length === 1) {
    day = "0" + day;
  }
  return `${day} ${month} ${year}`;
}

export function formatTitle(string, num) {
  if (string.length <= num) return string;
  return string.slice(0, 21) + "...";
}
