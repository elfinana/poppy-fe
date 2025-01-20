export const operations = (
  openingTime: { hour: number; minute: number },
  closingTime: { hour: number; minute: number },
): 'operational' | 'closed' => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const openingMinutes = openingTime.hour * 60 + openingTime.minute;
  const closingMinutes = closingTime.hour * 60 + closingTime.minute;

  return currentMinutes >= openingMinutes && currentMinutes < closingMinutes ? 'operational' : 'closed';
};
