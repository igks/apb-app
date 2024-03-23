import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrdFIkjyZEPKbqe1Tl7DxAuoL9Ix0lKm4",
  authDomain: "apb-app-63a10.firebaseapp.com",
  projectId: "apb-app-63a10",
  storageBucket: "apb-app-63a10.appspot.com",
  messagingSenderId: "844670029576",
  appId: "1:844670029576:web:ed619732ad80d5428266bd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
