import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getPreviousPeriod } from "helpers/period";
import { useBudgetStore } from "../store/budgetStore";
import { useUiStore } from "../store/uiStore";
import { copyBudgetDetail, getBudgetDetails } from "./budgetDetail";
import { db } from "./firebase";

const uiState = useUiStore.getState();
const budgetRef = collection(db, "budget");

export const getBudget = async (month, year) => {
  uiState.uiLoading();
  const q = query(
    budgetRef,
    where("month", "==", `${month}`),
    where("year", "==", `${year}`)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const budget = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };
    const details = await getBudgetDetails(snapshot.docs[0].id);
    useBudgetStore.getState().receiveBudget({ budget, details });
    uiState.resetUi();
  } else {
    useBudgetStore.getState().resetBudget();
    uiState.resetUi();
  }
};

export const copyBudget = async (currentMonth, currentYear) => {
  uiState.uiLoading();
  const { month, year } = getPreviousPeriod(currentMonth, currentYear);

  const q = query(
    budgetRef,
    where("month", "==", `${month}`),
    where("year", "==", `${year}`)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const budget = {
      ...snapshot.docs[0].data(),
      month: currentMonth,
      year: currentYear,
    };

    const newBudget = await addDoc(budgetRef, budget);
    await copyBudgetDetail(currentMonth, currentYear, newBudget.id);
    await getBudget(currentMonth, currentYear);
    uiState.resetUi();
  } else {
    useBudgetStore.getState().resetBudget();
    uiState.resetUi();
  }
};

export const addBudget = async (budget) => {
  uiState.uiLoading();
  const snapshot = await addDoc(budgetRef, budget);
  const newBudget = await getDoc(doc(db, "budget", snapshot.id));
  const budgetState = {
    id: newBudget.id,
    ...newBudget.data(),
  };
  useBudgetStore.getState().receiveBudget({ budget: budgetState });
  uiState.resetUi();
};

export const updateBudget = async (budget) => {
  uiState.uiLoading();
  await updateDoc(doc(db, "budget", budget.id), { ...budget });
  getBudget(budget.month, budget.year);
  uiState.resetUi();
};
