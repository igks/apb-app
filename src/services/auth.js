import { db } from "services/firebase";
import { getDocs, query, collection } from "firebase/firestore";

export const login = async (email, password) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "auth")));
    const credential = querySnapshot.docs[0].data();
    const currentVersion = localStorage.getItem("apb-version");
    if (currentVersion != credential.version) {
      localStorage.setItem("apb-version", credential.version);
      window.location.reload(true);
      return;
    }

    if (email !== credential.email && password !== credential.password) {
      return { isAuthenticated: false };
    } else {
      return { isAuthenticated: true };
    }
  } catch (err) {
    return { isError: true, error: err };
  }
};
