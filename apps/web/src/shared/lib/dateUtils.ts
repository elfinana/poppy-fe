export const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export type DateObject = {
  year: number;
  month: number;
  day: number;
};

export const getDayOfWeek = (dateObj: DateObject): string => {
  const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
  return daysOfWeek[date.getDay()];
};

export const formatDay = (dateObj: DateObject): string => {
  return `${dateObj.year}.${dateObj.month}.${dateObj.day} (${getDayOfWeek(dateObj)})`;
};
