import { optionYear } from "constants";

const SelectYear = ({ onChange }) => {
  return (
    <select className="form-select" onChange={onChange}>
      <option value="_">Pilih Tahun</option>
      {optionYear.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default SelectYear;
