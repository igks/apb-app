import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useBudgetStore } from "./../zustand/budgetStore";
import { useUiStore } from "./../zustand/uiStore";

const expenseRef = collection(db, "expense");
const uiState = useUiStore.getState();
const budgetState = useBudgetStore.getState();

export const getExpense = async (detailId) => {
  const q = query(expenseRef, where("detailId", "==", detailId));
  const snapshot = await getDocs(q);
  const expense = [];
  if (!snapshot.empty) {
    snapshot.forEach((s) => {
      expense.push({
        id: s.id,
        ...s.data(),
      });
    });
  }
  return expense;
};

export const addExpense = async (expense) => {
  uiState.uiLoading();
  await addDoc(expenseRef, expense);
  const expenseList = await getExpense(expense.detailId);
  budgetState.receiveExpense(expenseList);
  uiState.resetUi();
};

export const deleteExpense = async (id, detailId) => {
  uiState.uiLoading();
  await deleteDoc(doc(db, "expense", id));
  const expenseList = await getExpense(detailId);
  budgetState.receiveExpense(expenseList);
  uiState.resetUi();
};
