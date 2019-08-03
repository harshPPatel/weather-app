export const dateConverter = (unixDate) => {
  // Date Object
  const date = new Date(unixDate * 1000);
  // Time period
  let timePeriod = 'am';

  // Hours
  let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
  if (date.getHours() > 12) {
    timePeriod = 'pm';
    hours = (date.getHours() - 12 < 10 ? '0' : '') + (date.getHours() - 12);
  }

  // Minutes
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

  // Returning in HH:MM AM format
  return `${hours}:${minutes} ${timePeriod}`;
};

export const tempConverter = fTemp => (((fTemp - 32) * (5 / 9)).toFixed(2));

export default {
  dateConverter,
  tempConverter,
};
