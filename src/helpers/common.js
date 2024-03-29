export const getBudgetBalance = (limit, detail) => {
  if (detail.length === 0) return limit;
  let totalDetail = 0;
  detail.forEach((d) => {
    totalDetail += parseInt(d.value);
  });
  return parseInt(limit) - parseInt(totalDetail);
};

export const getUnAllocatedBudget = (balance, deposit) => {
  return parseInt(balance) + parseInt(deposit);
};
