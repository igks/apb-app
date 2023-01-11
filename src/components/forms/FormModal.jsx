import React from "react";
import * as S from "./styled.component";

const FormModal = ({ formData, updateFormData, setIsShowModal, onSubmit }) => {
  return (
    <S.Container onClick={() => setIsShowModal(false)}>
      <S.Modal>
        <S.Header> {formData.id == null ? "Tambah" : "Edit"} Item</S.Header>
        <S.Body>
          <S.Form>
            <S.Label>Item</S.Label>
            <S.Input
              type="text"
              value={formData.item}
              name="item"
              autoComplete="off"
              onChange={(e) => updateFormData(e)}
            />
          </S.Form>
          <S.Form>
            <S.Label>Jumlah</S.Label>
            <S.Input
              type="number"
              value={formData.value}
              name="value"
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

export default FormModal;
