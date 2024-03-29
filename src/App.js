import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import FormLogin from "components/forms/FormLogin";

import "App.css";

import Container from "container";
import store from "redux/store";
import { appRoutes } from "routes";
import { getUser, login } from "services/auth";

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

  const checkUser = () => {
    const user = getUser();
    if (user?.email != null) {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

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
      <Provider store={store}>
        {!isAuthenticated ? (
          <Container content={Login} />
        ) : (
          <Container header={header} content={appRoutes} />
        )}
      </Provider>
    </>
  );
}

export default App;
