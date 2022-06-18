import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { db } from "./services/firebase";
import { doc, getDoc } from "firebase/firestore";
import FormLogin from "./pages/FormLogin";
import Menu from "./pages/Menu";
import Anggaran from "./pages/Anggaran";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const updateFormLogin = (e) => {
    let targetName = e.target.name;
    setFormLogin({
      ...formLogin,
      [targetName]: e.target.value,
    });
  };

  const onLogin = async () => {
    try {
      let docSnap = await getDoc(doc(db, "auth", "Kds5mdBvmZ05cRJBYmFL"));
      let credential = docSnap.data();
      if (
        formLogin.email !== credential.email &&
        formLogin.password !== credential.password
      ) {
        alert("Email atau password salah!");
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="text-center my-2">
        <h4>Anggaran Pengeluaran Bulanan</h4>
        <hr />
      </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Menu />}></Route>
          <Route path="/anggaran" element={<Anggaran />}></Route>
        </Routes>
      </Router>

      {!isAuthenticated && (
        <div className="container">
          <FormLogin
            formLogin={formLogin}
            updateFormLogin={updateFormLogin}
            onLogin={onLogin}
          />
        </div>
      )}
    </>
  );
}

export default App;
