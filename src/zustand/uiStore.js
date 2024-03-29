import { create } from "zustand";

const initialUi = {
  isLoading: false,
};

export const useUiStore = create((set) => ({
  ui: initialUi,
  uiLoading: () =>
    set({
      ui: {
        isLoading: true,
      },
    }),
  resetUi: () =>
    set({
      ui: initialUi,
    }),
}));
