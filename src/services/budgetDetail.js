import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useUiStore } from "./../zustand/uiStore";
import { getBudget } from "./budget";

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
