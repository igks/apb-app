import { optionBulan } from "constants";

const SelectMonth = ({ onChange }) => {
  return (
    <select className="form-select" onChange={onChange}>
      <option value="_">Pilih Bulan</option>
      {optionBulan.map((bulan) => (
        <option key={bulan} value={bulan}>
          {bulan}
        </option>
      ))}
    </select>
  );
};

export default SelectMonth;
