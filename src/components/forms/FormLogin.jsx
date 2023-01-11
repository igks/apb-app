import React from "react";
import * as S from "./styled.component";

const FormLogin = ({ formLogin, updateFormLogin, onLogin }) => {
  return (
    <S.Container>
      <S.Modal>
        <S.Header>Form Login</S.Header>
        <S.Body>
          <S.Form>
            <S.Label>Email</S.Label>
            <S.Input
              type="email"
              value={formLogin.email}
              name="email"
              onChange={(e) => updateFormLogin(e)}
            />
          </S.Form>
          <S.Form>
            <S.Label>Password</S.Label>
            <S.Input
              type="password"
              value={formLogin.password}
              name="password"
              onChange={(e) => updateFormLogin(e)}
            />
          </S.Form>
        </S.Body>
        <S.Footer>
          <S.Button type="button" onClick={onLogin} color={"#4caf50"}>
            Login
          </S.Button>
        </S.Footer>
      </S.Modal>
    </S.Container>
  );
};

export default FormLogin;
