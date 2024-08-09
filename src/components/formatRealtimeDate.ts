export const formatRealtimeDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  if (diffSeconds <= 10) {
    return 'Только что';
  }

  if (diffSeconds < 60) {
    return `${diffSeconds} секунд назад`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} минут назад`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 4) {
    return `${diffHours} часов назад`;
  }

  if (diffHours < 24) {
    return `сегодня в ${date.toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }

  if (diffHours < 48) {
    return `вчера в ${date.toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit'
    })}`
  }

  const diffYears = diffHours / 24 / 365;
  if (diffYears < 1) {
    return `${date.toLocaleDateString('ru', {
      day: 'numeric',
      month: 'short'
    }).slice(0, -1)} в ${date.toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }

  return `${date.toLocaleDateString('ru', {
    day: '2-digit',
    month: 'short',
  }).slice(0, -1)} ${date.getFullYear()}`
};
