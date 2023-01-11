import React from "react";
import * as S from "./styled.component";

const FormConfig = ({ formData, updateFormData, setIsShowModal, onSubmit }) => {
  return (
    <S.Container onClick={() => setIsShowModal(false)}>
      <S.Modal>
        <S.Header>Update Config</S.Header>
        <S.Body>
          <S.Form>
            <S.Label>Income</S.Label>
            <S.Input
              type="number"
              value={formData.income}
              name="income"
              autoComplete="off"
              onChange={(e) => updateFormData(e)}
            />
          </S.Form>
          <S.Form>
            <S.Label>Balance</S.Label>
            <S.Input
              type="number"
              value={formData.carryForward}
              name="carryForward"
              autoComplete="off"
              onChange={(e) => updateFormData(e)}
            />
          </S.Form>
        </S.Body>
        <S.Footer>
          <S.Button
            type="button"
            onClick={() => setIsShowModal(false)}
            color={"#f44336"}
          >
            Tutup
          </S.Button>
          <S.Button type="button" onClick={onSubmit} color={"#4caf50"}>
            Simpan
          </S.Button>
        </S.Footer>
      </S.Modal>
    </S.Container>
  );
};

export default FormConfig;
