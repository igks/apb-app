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

export const loadAnggaranList = async (bulan) => {
  const q = query(
    collection(db, "records"),
    where("bulan", "==", bulan),
    orderBy("item")
  );
  const querySnapshot = await getDocs(q);
  const records = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    records.push({
      id: doc.id,
      item: data.item,
      value: data.value,
      isApprove: data.isApprove,
      details: data.details,
      bulan: data.bulan,
    });
  });
  return records;
};

export const calculateTotal = (records) => {
  let sum = 0;
  let used = 0;
  records.forEach((record) => {
    if (record.isApprove) {
      sum += record.value;
      if (record?.details?.length > 0 ?? false) {
        record.details.forEach((detail) => {
          used += detail.value;
        });
      }
    }
  });
  return { sum, used };
};

export const addAnggaran = async (formData) => {
  if (formData.item === "" || formData.value < 0) return { isValid: false };

  if (formData.id != null) {
    try {
      await updateDoc(doc(db, "records", `${formData.id}`), {
        item: formData.item,
        value: formData.value,
      });
    } catch (err) {
      return { isValid: true, error: err };
    }
  } else {
    try {
      await addDoc(collection(db, "records"), formData);
    } catch (err) {
      return { isValid: true, error: err };
    }
  }

  return { isValid: true };
};

export const deleteAnggaran = async (id) => {
  try {
    await deleteDoc(doc(db, "records", id));
    return { isSuccess: true };
  } catch (err) {
    return { error: err };
  }
};
