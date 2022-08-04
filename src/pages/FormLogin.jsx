import React from "react";

const FormLogin = ({ formLogin, updateFormLogin, onLogin }) => {
  return (
    <div
      style={{
        width: "100%",
        height: 700,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Form Login</h5>
          </div>

          <div className="px-3 mb-3">
            <p className="p-0 m-0">Email</p>
            <input
              className="form-control form-control-sm"
              type="email"
              value={formLogin.email}
              name="email"
              onChange={(e) => updateFormLogin(e)}
            />
          </div>

          <div className="px-3 mb-3">
            <p className="p-0 m-0">Password</p>
            <input
              className="form-control form-control-sm"
              type="password"
              value={formLogin.password}
              name="password"
              onChange={(e) => updateFormLogin(e)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={onLogin}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
