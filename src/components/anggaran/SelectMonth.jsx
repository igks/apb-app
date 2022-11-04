import React from "react";
import { optionBulan } from "../../constants";

const SelectMonth = ({ onSetMonth }) => {
  return (
    <div style={{ width: "100%" }}>
      <select
        style={{
          width: "100%",
          height: 50,
          fontSize: 16,
          padding: 10,
          border: "1px solid grey",
          borderRadius: 10,
          backgroundColor: "white",
        }}
        onChange={(e) => onSetMonth(e.target.value)}
      >
        {optionBulan.map((bln) => (
          <option key={bln} value={bln.toLowerCase()}>
            {bln}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMonth;
