import * as decline from "@/features/string/decline";

const declineSeconds = decline.create({
  1: 'секунду',
  2: 'секунды',
  5: 'секунд',
});

const declineMinutes = decline.create({
  1: 'минуту',
  2: 'минуты',
  5: 'минут',
});

const declineHours = decline.create({
  1: 'час',
  2: 'часа',
  5: 'часов',
});

export const format = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  if (diffSeconds <= 10) {
    return 'Только что';
  }

  if (diffSeconds < 60) {
    return `${diffSeconds} ${declineSeconds(diffSeconds)} назад`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} ${declineMinutes(diffMinutes)} назад`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 4) {
    return `${diffHours} ${declineHours(diffHours)} назад`;
  }

  if (diffHours < 24) {
    if (date.getDay() !== now.getDay()) {
      return `вчера в ${date.toLocaleTimeString('ru', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }

    return `сегодня в ${date.toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
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
