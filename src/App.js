import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";

import FormLogin from "pages/FormLogin";
import Menu from "pages/Menu";
import Anggaran from "pages/Anggaran";
import Detail from "pages/Detail";

import "App.css";
import Catatan from "pages/Catatan";
import MyChart from "pages/Chart";
import { login } from "services/auth";

import store from "redux/store";

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

  return (
    <>
      <Provider store={store}>
        {!isAuthenticated ? (
          <FormLogin
            formLogin={formLogin}
            updateFormLogin={updateFormLogin}
            onLogin={onLogin}
          />
        ) : (
          <div className="main-container">
            <div className="text-center my-2">
              <h6>Anggaran Pengeluaran Bulanan</h6>
              <hr />
            </div>
            <div className="content-container">
              <Router>
                <Routes>
                  <Route exact path="/" element={<Menu />}></Route>
                  <Route path="/anggaran" element={<Anggaran />}></Route>
                  <Route path="/detail" element={<Detail />}></Route>
                  <Route path="/catatan" element={<Catatan />}></Route>
                  <Route path="/chart" element={<MyChart />}></Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
            </div>
          </div>
        )}
      </Provider>
    </>
  );
}

export default App;
