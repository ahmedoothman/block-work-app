export const calcDuration = (duration) => {
  const months = Math.floor(duration / 30);
  const remainingDaysAfterMonths = duration % 30;
  const weeks = Math.floor(remainingDaysAfterMonths / 7);
  const days = remainingDaysAfterMonths % 7;

  const monthsText = months ? `${months} month${months > 1 ? 's' : ''}` : '';
  const weeksText = weeks ? `${weeks} week${weeks > 1 ? 's' : ''}` : '';
  const daysText = days ? `${days} day${days > 1 ? 's' : ''}` : '';

  return [monthsText, weeksText, daysText].filter(Boolean).join(' and ');
};
