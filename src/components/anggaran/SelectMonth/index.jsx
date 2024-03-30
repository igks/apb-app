import { optionBulan } from "constants";
import * as S from "./styled.component";

const SelectMonth = ({ setPeriod }) => {
  const bulanOnChange = (e) => {
    const value = e.target.value;
    const d = new Date(value);
    const month = optionBulan[d.getMonth()];
    const year = d.getFullYear();
    setPeriod({ month, year });
  };

  return (
    <S.Container>
      <S.Label>Pilih Bulan</S.Label>
      <S.Input
        type="month"
        id="month"
        className="form-control"
        onChange={bulanOnChange}
      />
    </S.Container>
  );
};

export default SelectMonth;
