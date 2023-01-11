import React from "react";
import * as S from "./styled.component";

const FormNote = ({ formData, updateFormData, setIsShowModal, onSubmit }) => {
  return (
    <S.Container onClick={() => setIsShowModal(false)}>
      <S.Modal>
        <S.Header>Tambah catatan</S.Header>
        <S.Body>
          <S.Form>
            <S.Label>Judul</S.Label>
            <S.Input
              type="text"
              value={formData.titla}
              name="title"
              autoComplete="off"
              onChange={(e) => updateFormData(e)}
            />
          </S.Form>
          <S.Form>
            <S.Label>Detail</S.Label>
            <S.TextArea
              name="detail"
              onChange={(e) => updateFormData(e)}
              rows={4}
              value={formData.detail}
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

export default FormNote;
