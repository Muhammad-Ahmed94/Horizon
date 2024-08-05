const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

export function dateFormat() {
    const date =  new Date();
    const day = days[date.getDay()];
    const todayDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = months[date.getMonth()];

    return `${day}, ${todayDate} - ${month}`;
}