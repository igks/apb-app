import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useBudgetStore } from "../store/budgetStore";
import { useUiStore } from "../store/uiStore";
import { updateDetailExpense } from "./budgetDetail";

const expenseRef = collection(db, "expense");
const uiState = useUiStore.getState();
const budgetState = useBudgetStore.getState();

export const getTotalExpense = (expenses) => {
  const total = expenses.reduce((acc, obj) => {
    return acc + parseInt(obj.value);
  }, 0);
  return total;
};

export const getExpense = async (detailId) => {
  uiState.uiLoading();
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
  uiState.resetUi();
  return expense;
};

export const addExpense = async (expense) => {
  uiState.uiLoading();
  await addDoc(expenseRef, expense);
  const expenseList = await getExpense(expense.detailId);
  budgetState.receiveExpense(expenseList);
  const totalExpense = getTotalExpense(expenseList);
  await updateDetailExpense(expense.detailId, totalExpense);
  uiState.resetUi();
};

export const deleteExpense = async (id, detailId) => {
  uiState.uiLoading();
  await deleteDoc(doc(db, "expense", id));
  const expenseList = await getExpense(detailId);
  budgetState.receiveExpense(expenseList);
  const totalExpense = getTotalExpense(expenseList);
  await updateDetailExpense(detailId, totalExpense);
  uiState.resetUi();
};

export const deleteBatchExpense = async (detailId) => {
  const batch = writeBatch(db);
  const expenseList = await getExpense(detailId);
  expenseList.forEach((e) => {
    const docRef = doc(db, "expense", e.id);
    batch.delete(docRef);
  });
  await batch.commit();
};

export const getDailyExpense = async (day, month, year) => {
  uiState.uiLoading();
  const q = query(
    expenseRef,
    where("date", "==", day),
    where("month", "==", `${month}`),
    where("year", "==", `${year}`)
  );
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
  uiState.resetUi();
  return expense;
};

export const getMonthlyExpense = async (month, year) => {
  uiState.uiLoading();
  const q = query(
    expenseRef,
    where("month", "==", `${month}`),
    where("year", "==", `${year}`)
  );
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
  uiState.resetUi();
  return expense;
};
