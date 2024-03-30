import { useState } from "react";
import { addBudget, updateBudget } from "services/budget";
import { useBudgetStore } from "../../store/budgetStore";
import { usePeriodStore } from "../../store/periodStore";
import * as S from "./styled.component";

const FormBudget = ({ handleClose, isUpdate }) => {
  const budget = useBudgetStore((state) => state.budget);
  const period = usePeriodStore((state) => state.period);

  const [formData, setFormData] = useState({
    limit: budget?.data?.limit ?? 0,
    deposit: budget?.data?.deposit ?? 0,
  });

  const updateFormData = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    if (isUpdate) {
      const updatedBudget = {
        ...budget.data,
        limit: formData.limit,
        deposit: formData.deposit,
      };
      await updateBudget(updatedBudget);
    } else {
      const newBudget = {
        month: period.month,
        year: period.year,
        limit: formData.limit,
        deposit: formData.deposit,
        balance: formData.limit,
      };
      await addBudget(newBudget);
    }
    handleClose();
  };

  return (
    <S.Container>
      <S.Modal>
        <S.Header>
          {budget?.data == null ? "Create Budget" : "Update Budget"}
        </S.Header>
        <S.Body>
          <S.Form>
            <S.Label>Income</S.Label>
            <S.Input
              type="number"
              value={formData.limit}
              name="limit"
              autoComplete="off"
              onChange={(e) => updateFormData(e)}
            />
          </S.Form>
          <S.Form>
            <S.Label>Deposit</S.Label>
            <S.Input
              type="number"
              value={formData.deposit}
              name="deposit"
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

export default FormBudget;
