import { create } from "zustand";

const initialPeriod = {
  month: "_",
  year: "_",
};

export const usePeriodStore = create((set) => ({
  period: initialPeriod,
  updatePeriod: ({ month, year }) =>
    set({
      period: { month, year },
    }),
  resetPeriod: () =>
    set({
      period: initialPeriod,
    }),
}));
