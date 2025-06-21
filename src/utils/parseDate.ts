export default function parseDate(
  dayOfYear: number | undefined,
  isLeapYear: boolean = false
): string {
  if (dayOfYear === undefined) {
    return '';
  }

  if (dayOfYear < 1 || dayOfYear > (isLeapYear ? 366 : 365)) {
    throw new Error(`Номер дня должен быть от 1 до ${isLeapYear ? 366 : 365}`);
  }

  const months = [
    { name: 'января', days: 31 },
    { name: 'февраля', days: isLeapYear ? 29 : 28 },
    { name: 'марта', days: 31 },
    { name: 'апреля', days: 30 },
    { name: 'мая', days: 31 },
    { name: 'июня', days: 30 },
    { name: 'июля', days: 31 },
    { name: 'августа', days: 31 },
    { name: 'сентября', days: 30 },
    { name: 'октября', days: 31 },
    { name: 'ноября', days: 30 },
    { name: 'декабря', days: 31 },
  ];

  let remainingDays = dayOfYear;

  for (const month of months) {
    if (remainingDays <= month.days) {
      return `${remainingDays} ${month.name}`;
    }
    remainingDays -= month.days;
  }

  throw new Error('Неожиданная ошибка при определении даты');
}
