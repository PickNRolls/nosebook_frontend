import { FormatDistanceOptions } from 'date-fns';
import { FormatDistanceToken, Locale, ru } from 'date-fns/locale';

function formatDistance(token: FormatDistanceToken, count: number, options?: FormatDistanceOptions): string {
  const original = ru.formatDistance(token, count, options);

  if (token === 'lessThanXMinutes') {
    return `< ${count} мин`;
  }

  if (token === 'xMinutes') {
    return `${count} мин`
  }

  if (token === 'xHours' || token === 'aboutXHours') {
    return `${count} ч`;
  }

  if (token === 'xDays') {
    return `${count} д`;
  }

  if (token === 'aboutXMonths' || token === 'xMonths') {
    if (count === 12) {
      return `1 год`;
    }

    return `${count} мес`;
  }

  if (token === 'almostXYears' || token === 'aboutXYears' || token === 'xYears') {
    return original.slice(5);
  }

  return original;
}

const locale: Locale = {
  ...ru,
  formatDistance,
}

export default locale;

