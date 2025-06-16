import * as S from "./styled.component";

const FormKwitansi = ({ formData, updateFormData, setIsShowModal, onSubmit }) => {
  return (
    <S.Container>
      <S.Modal>
        <S.Header>Upload Kwitansi</S.Header>
        <S.Body>
          <S.Form>
            <S.Label>Periode</S.Label>
            <S.Input
              type="text"
              value={formData.period}
              name="period"
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
            Upload
          </S.Button>
        </S.Footer>
      </S.Modal>
    </S.Container>
  );
};

export default FormKwitansi;
