import { create } from "zustand";

const initialBudget = {
  data: null,
  details: [],
  expense: [],
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
  receiveExpense: (expense) =>
    set((state) => ({
      budget: {
        ...state.budget,
        expense,
      },
    })),
  resetBudget: () =>
    set({
      budget: initialBudget,
    }),
}));
