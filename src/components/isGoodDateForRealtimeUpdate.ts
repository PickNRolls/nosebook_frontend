export const isGoodDateForRealtimeUpdate = (date: Date): boolean => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 1000 / 60 / 60);
  return diffHours < 1;
};
