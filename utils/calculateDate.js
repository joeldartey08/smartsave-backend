const calculateNextDate = (startDate, planType) => {
  let days =
    planType === "daily"
      ? 1
      : planType === "weekly"
      ? 7
      : planType === "monthly"
      ? 30
      : 365;
  const date = new Date(startDate);

  date.setDate(date.getDate() + days);

  return date;
};

module.exports = calculateNextDate;
