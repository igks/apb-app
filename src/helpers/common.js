export const getBudgetBalance = (limit, detail) => {
  if (detail.length === 0) return limit;
  let totalDetail = 0;
  detail.forEach((d) => {
    totalDetail += parseInt(d.value);
  });
  return parseInt(limit) - parseInt(totalDetail);
};

export const getAvailableBudget = (detail = []) => {
  if (detail.length === 0) return 0;
  let totalExpense = 0;
  let totalBudget = 0;
  detail.forEach((d) => {
    totalExpense += parseInt(d.expense);
    totalBudget += parseInt(d.value);
  });

  return totalBudget - totalExpense;
};

export const getUnAllocatedBudget = (balance, deposit) => {
  return parseInt(balance) + parseInt(deposit);
};
