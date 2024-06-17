export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getPeriodDates = (period: "week" | "month" | "halfYear" | "year" | "twoYears") => {
  const currentDate = new Date();
  const fromDate = new Date(currentDate);
  const toDate = currentDate.toISOString().split("T")[0];

  switch (period) {
    case "week":
      fromDate.setDate(currentDate.getDate() - 7);
      break;
    case "month":
      fromDate.setMonth(currentDate.getMonth() - 1);
      break;
    case "halfYear":
      fromDate.setMonth(currentDate.getMonth() - 6);
      break;
    case "year":
      fromDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    case "twoYears":
      fromDate.setFullYear(currentDate.getFullYear() - 2);
      break;
    default:
      break;
  }

  return {
    fromDate: fromDate.toISOString().split("T")[0],
    toDate,
  };
};
