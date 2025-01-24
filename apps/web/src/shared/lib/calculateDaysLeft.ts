export interface DateObject {
  year: number;
  month: number;
  day: number;
}

/**
 * @function calculateDaysLeft
 * @description 종료일과 오늘 날짜를 비교하여 D-Day 계산
 * @param {DateObject} endDate 종료일 (연도, 월, 일)
 * @returns {number} 종료일까지 남은 일수 (D-n 형식의 n 값)
 */
export const calculateDaysLeft = (endDate?: DateObject): number | null => {
  if (!endDate) return null;

  const today = new Date();
  const targetDate = new Date(endDate.year, endDate.month - 1, endDate.day);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
