/**@function formatToYMD
 * @description year, month, day → mm.dd (DD)
 * @param {number} year 년
 * @param {number} month 월
 * @param {number} day 일
 * @returns {string} mm.dd (D)
 * @example formatToMD(2024, 12, 31) → 12.31 (화)
 */
export const formatToMD = (date: Date): string => {
  return `${date.month}.${date.day}(${getDayOfTheWeek(date)})`;
};

const getDayOfTheWeek = (date: Date): string => {
  switch (new Date(date.year, date.month, date.day).getDay()) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      throw new Error('[getDayOfTheWeek]: Calculation result out of range');
  }
};

export const getDateDifference = (date1: Date, date2: Date) => {
  const target1 = new Date(date1.year, date1.month, date1.day).getTime();
  const target2 = new Date(date2.year, date2.month, date2.day).getTime();

  const diffTime = target1 - target2;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 밀리초 → 일수 변환

  return diffDays;
};

interface Date {
  year: number;
  month: number;
  day: number;
}
