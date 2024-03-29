import { useState } from "react";
import { addBudgetDetail } from "services/budgetDetail";
import * as S from "./styled.component";

const FormModalDetail = ({ budget, handleClose }) => {
  const { id, month, year } = budget?.data;
  const [formData, setFormData] = useState({
    name: "",
    value: 0,
  });

  const updateFormData = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    const detail = {
      budgetId: id,
      month,
      year,
      name: formData.name,
      value: formData.value,
      balance: formData.value,
    };
    await addBudgetDetail(detail);
    handleClose();
  };

  return (
    <S.Container>
      <S.Modal>
        <S.Header> {formData.id == null ? "Tambah" : "Edit"} Item</S.Header>
        <S.Body>
          <S.Form>
            <S.Label>Item</S.Label>
            <S.Input
              type="text"
              value={formData.item}
              name="name"
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
          <S.Button type="button" onClick={handleClose} color={"#f44336"}>
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

export default FormModalDetail;
