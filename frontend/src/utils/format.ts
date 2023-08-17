
export const formatDaysHoursMinutesSeconds = (timeInSeconds) => {
  const days = Math.floor(timeInSeconds / (60 * 60 * 24));
  const hours = Math.floor((timeInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
  const seconds = timeInSeconds % 60;

  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
};

export const formatHours = (timeInSeconds) => {
  const hours = Math.floor((timeInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
  const seconds = timeInSeconds % 60;
  return `${hours} hours ${minutes} minutes ${seconds} seconds`;
};

export const formatMinutes = (timeInSeconds) => {
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
  const seconds = timeInSeconds % 60;

  return `${minutes} minutes ${seconds} seconds` ;
};

export const formatSeconds = (timeInSeconds) => {
  const seconds = timeInSeconds % 60;
  return `${seconds} seconds`;
};