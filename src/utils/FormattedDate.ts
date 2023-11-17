export const FormattedDate = (date: string) => {
  const newDate = new Date(date);

  const day = newDate.getUTCDate();
  const month = newDate.getUTCMonth() + 1;
  const year = newDate.getUTCFullYear();

  const addLeadingZero = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  const formattedDay = addLeadingZero(day);
  const formattedMonth = addLeadingZero(month);

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};
