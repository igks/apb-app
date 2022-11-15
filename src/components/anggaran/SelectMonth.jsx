import React from "react";
import { optionBulan } from "constants";

const SelectMonth = ({ onSetMonth }) => {
  const bulanOnChange = (e) => {
    const value = e.target.value;
    const d = new Date(value);
    const month = d.getMonth();
    const monthString = optionBulan[month + 1].toLowerCase();
    onSetMonth(monthString);
  };

  return (
    <div className="row g-3 align-items-center justify-content-between mb-3">
      <div className="col">
        <label className="col-form-label">Pilih bulan</label>
      </div>
      <div className="col-8 ">
        <input
          type="month"
          id="month"
          className="form-control"
          onChange={bulanOnChange}
        />
      </div>
    </div>
  );
};

export default SelectMonth;
