import { useState } from "react";

import FormLogin from "components/forms/FormLogin";

import "App.css";

import Container from "container";
import { appRoutes } from "routes";
import { firebaseAuth, login } from "services/auth";

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
    const { isError, error, isAuthenticated } = await login(
      formLogin.email,
      formLogin.password
    );

    if (!isError && isAuthenticated) setIsAuthenticated(true);
    if (!isError && !isAuthenticated) alert("Email atau password salah!");
    if (isError) alert(error);
  };

  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      setIsAuthenticated(true);
    }
  });

  const header = (
    <div className="text-center my-2">
      <h6 style={{ fontWeight: "bold" }}>Anggaran Pengeluaran Bulanan</h6>
      <hr style={{ margin: 0, padding: 0 }} />
    </div>
  );

  const Login = (
    <FormLogin
      formLogin={formLogin}
      updateFormLogin={updateFormLogin}
      onLogin={onLogin}
    />
  );

  return (
    <>
      {!isAuthenticated ? (
        <Container content={Login} />
      ) : (
        <Container header={header} content={appRoutes} />
      )}
    </>
  );
}

export default App;
