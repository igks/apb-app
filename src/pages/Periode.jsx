import SelectMonth from "components/forms/SelectMonth";
import SelectYear from "components/forms/SelectYear";
import { Button } from "components/forms/styled.component";
import { Center, Space } from "components/shared/common";
import { Colors } from "constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePeriodStore } from "./../zustand/periodStore";

const Periode = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState("_");
  const [year, setYear] = useState("_");
  const updatePeriod = usePeriodStore((state) => state.updatePeriod);

  const handlePeriodChange = () => {
    if (month === "_" || year === "_") {
      return alert("Pilih tanggal dan tahun!");
    }
    updatePeriod({ month, year });
  };

  return (
    <>
      <SelectMonth onChange={(e) => setMonth(e.target.value)} />
      <Space h="20px" />
      <SelectYear onChange={(e) => setYear(e.target.value)} />
      <Space h="20px" />
      <Center>
        <Button type="button" onClick={() => navigate("/")} color={Colors.grey}>
          Kembali
        </Button>
        <Button type="button" onClick={handlePeriodChange} color={"#4caf50"}>
          Cari
        </Button>
      </Center>
    </>
  );
};

export default Periode;
