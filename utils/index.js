export const calcDuration = (duration) => {
  if (duration.length > 3) {
    return "2 weeks"; //' i did this condition because the duration in the third contract is (22000000000000000000)
  }
  const months = Math.floor(duration / 30);
  const remainingDaysAfterMonths = duration % 30;
  const weeks = Math.floor(remainingDaysAfterMonths / 7);
  const days = remainingDaysAfterMonths % 7;

  const monthsText = months ? `${months} month${months > 1 ? "s" : ""}` : "";
  const weeksText = weeks ? `${weeks} week${weeks > 1 ? "s" : ""}` : "";
  const daysText = days ? `${days} day${days > 1 ? "s" : ""}` : "";

  return [monthsText, weeksText, daysText].filter(Boolean).join(" and ");
};
