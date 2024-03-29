import FormBudget from "components/forms/FormBudget";
import { Button } from "components/forms/styled.component";
import { Center, Space } from "components/shared/common";
import { Colors } from "constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { copyBudget } from "services/budget";
import { usePeriodStore } from "./../../../zustand/periodStore";

const NoBudget = () => {
  const navigate = useNavigate();
  const [isShowFormBudget, setIsShowFormBudget] = useState(false);
  const periodeState = usePeriodStore((state) => state);

  const handleCopyBudget = async () => {
    const { month, year } = periodeState.period;
    await copyBudget(month, year);
  };
  return (
    <>
      <div className="alert alert-info">
        Tidak ada data ditemukan pada periode ini!
      </div>
      <Space h="10px" />
      <Center>
        <Button
          type="button"
          onClick={() => {
            periodeState.resetPeriod();
            navigate("/");
          }}
          color={Colors.grey}
        >
          Back
        </Button>
        <Space w="15px" />
        <Button type="button" onClick={handleCopyBudget} color={Colors.orange}>
          Copy
        </Button>
        <Space w="15px" />
        <Button
          type="button"
          onClick={() => setIsShowFormBudget(true)}
          color={"#4caf50"}
        >
          New
        </Button>
      </Center>
      {isShowFormBudget && (
        <FormBudget
          handleClose={() => setIsShowFormBudget(false)}
          isUpdate={false}
        />
      )}
    </>
  );
};

export default NoBudget;
