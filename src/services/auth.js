import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const firebaseAuth = getAuth();

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
    return { isAuthenticated: true };
  } catch (err) {
    return { isError: true, error: err };
  }
};

export const getUser = () => {
  return firebaseAuth.currentUser;
};
