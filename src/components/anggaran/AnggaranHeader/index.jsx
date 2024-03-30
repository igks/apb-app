import {
  AddFileIcon,
  BalanceIcon,
  CarryForwardIcon,
  GoBackIcon,
  IncomeIcon,
  UnAllocatedIcon,
} from "components/shared/Icons";
import { Colors } from "constants";
import { getBudgetBalance, getUnAllocatedBudget } from "helpers/common";
import { currencyFormat } from "helpers/currency-format";
import { useNavigate } from "react-router-dom";
import { useBudgetStore } from "../../../store/budgetStore";
import { usePeriodStore } from "../../../store/periodStore";
import * as S from "./styled.component";

const AnggaranHeader = ({ onCreateBudget, onAddDetail }) => {
  const navigate = useNavigate();
  const resetPeriod = usePeriodStore((state) => state.resetPeriod);
  const { data: budget, details } = useBudgetStore((state) => state.budget);

  const balance = getBudgetBalance(budget.limit, details);
  const unAllocated = getUnAllocatedBudget(balance, budget.deposit);

  const handleGoBack = () => {
    resetPeriod();
    navigate("/");
  };

  return (
    <>
      <S.Row mb="5px">
        <S.Card color="#c8e6c9" onClick={onCreateBudget}>
          <IncomeIcon size="1x" />{" "}
          <span> {currencyFormat(parseInt(budget.limit))}</span>
        </S.Card>
        <S.Card color="#bbdefb" onClick={onCreateBudget}>
          <CarryForwardIcon size="1x" />
          <span> {currencyFormat(parseInt(budget.deposit))}</span>
        </S.Card>
      </S.Row>
      <S.Row>
        <S.Card color="#ffcdd2">
          <BalanceIcon size="1x" />{" "}
          <span> {currencyFormat(parseInt(balance))}</span>
        </S.Card>
        <S.Card color="#ffe57f">
          <UnAllocatedIcon size="1x" />{" "}
          <span> {currencyFormat(parseInt(unAllocated))}</span>
        </S.Card>
      </S.Row>
      <S.Divider />
      <S.Row>
        <GoBackIcon size="xl" color={Colors.grey} onClick={handleGoBack} />
        <S.Title>{`${budget.month.toUpperCase()} - ${budget.year}`}</S.Title>
        <AddFileIcon size="xl" color={Colors.green} onClick={onAddDetail} />
      </S.Row>
      <S.Divider />
    </>
  );
};

export default AnggaranHeader;
