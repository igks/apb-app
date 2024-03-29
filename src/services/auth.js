import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email, password) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { isAuthenticated: true };
  } catch (err) {
    return { isError: true, error: err };
  }
};

export const getUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};
