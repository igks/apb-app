import { create } from "zustand";

const initialBudget = {
  data: null,
  details: [],
};

export const useBudgetStore = create((set) => ({
  budget: initialBudget,
  receiveBudget: ({ budget, details = [] }) => {
    set({
      budget: {
        data: budget,
        details,
      },
    });
  },
  resetBudget: () =>
    set({
      budget: initialBudget,
    }),
}));
