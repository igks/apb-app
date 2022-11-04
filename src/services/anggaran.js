import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";

export const loadConfig = async () => {
  try {
    let docSnap = await getDoc(doc(db, "config", "1AaziUG8gGvwTPFI5CTK"));
    let config = docSnap.data();
    return { isSuccess: true, data: config };
  } catch (err) {
    return { isSuccess: false, data: err };
  }
};
