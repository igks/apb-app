import React from "react";
import { optionBulan } from "constants";
import * as S from "./styled.component";

const SelectMonth = ({ onSetMonth }) => {
  const bulanOnChange = (e) => {
    const value = e.target.value;
    const d = new Date(value);
    const month = d.getMonth();
    const monthString = optionBulan[month + 1].toLowerCase();
    onSetMonth(monthString);
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
