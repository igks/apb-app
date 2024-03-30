import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getPreviousPeriod } from "helpers/period";
import { db } from "../services/firebase";
import { useUiStore } from "../store/uiStore";
import { getBudget } from "./budget";
import { deleteBatchExpense } from "./expense";

const detailRef = collection(db, "budget-detail");
const uiState = useUiStore.getState();

export const getBudgetDetails = async (budgetId) => {
  const q = query(
    detailRef,
    where("budgetId", "==", budgetId),
    orderBy("name", "asc")
  );
  const snapshot = await getDocs(q);
  const details = [];
  if (!snapshot.empty) {
    snapshot.forEach((s) => {
      details.push({
        id: s.id,
        ...s.data(),
      });
    });
  }
  return details;
};

export const addBudgetDetail = async (detail) => {
  uiState.uiLoading();
  await addDoc(detailRef, detail);
  await getBudget(detail.month, detail.year);
  uiState.resetUi();
};

export const copyBudgetDetail = async (currentMonth, currentYear, budgetId) => {
  uiState.uiLoading();
  const { month, year } = getPreviousPeriod(currentMonth, currentYear);

  const q = query(
    detailRef,
    where("month", "==", `${month}`),
    where("year", "==", `${year}`)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    snapshot.forEach(async (s) => {
      const detail = {
        ...s.data(),
        budgetId,
        month: currentMonth,
        year: currentYear,
        expense: 0,
      };
      await addDoc(detailRef, detail);
    });
    uiState.resetUi();
  } else {
    uiState.resetUi();
  }
};

export const updateBudgetDetail = async (id, detail) => {
  uiState.uiLoading();
  await updateDoc(doc(db, "budget-detail", id), {
    name: detail.name,
    value: detail.value,
  });
  await getBudget(detail.month, detail.year);
  uiState.resetUi();
};

export const updateDetailExpense = async (id, expense) => {
  uiState.uiLoading();
  await updateDoc(doc(db, "budget-detail", id), {
    expense,
  });
  uiState.resetUi();
};

export const deleteDetail = async (record) => {
  uiState.uiLoading();
  await deleteDoc(doc(db, "budget-detail", record.id));
  await deleteBatchExpense(record.id);
  await getBudget(record.month, record.year);
  uiState.resetUi();
};
