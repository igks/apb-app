import { optionBulan } from "constants";

export const getPreviousPeriod = (currentMonth, currentYear) => {
  let month;
  let year;
  const index = optionBulan.indexOf(currentMonth);

  if (index === 0) {
    month = optionBulan[optionBulan.length - 1];
    year = (parseInt(currentYear) - 1).toString();
  } else {
    month = optionBulan[index - 1];
    year = currentYear;
  }
  return { month, year };
};
