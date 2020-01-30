export const combineDateAndTime = (created: Date, time: Date) => {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00";

  const year = created.getFullYear();
  const month = created.getMonth() + 1;
  const day = created.getDate();
  const dateString = `${year}-${month}-${day}`;

  return new Date(dateString + " " + timeString);
};
