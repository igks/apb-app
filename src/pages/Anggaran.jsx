import { useEffect, useState } from "react";

import AnggaranHeader from "components/anggaran/AnggaranHeader";
import AnggaranList from "components/anggaran/AnggaranList";
import NoBudget from "components/anggaran/NoBudget";
import FormBudget from "components/forms/FormBudget";
import LoadingFallback from "components/shared/LoadingFallback";
import { getBudget } from "services/budget";
import FormModalDetail from "../components/forms/FormModalDetail";
import { default as SelectPeriod } from "../components/shared/common/SelectPeriod";
import { useBudgetStore } from "../store/budgetStore";
import { usePeriodStore } from "../store/periodStore";
import { useUiStore } from "../store/uiStore";
import * as S from "./styled.component";

const Anggaran = () => {
  const { month, year } = usePeriodStore((state) => state.period);
  const budget = useBudgetStore((state) => state.budget);
  const ui = useUiStore((state) => state.ui);

  const noPeriod = month === "_" || year === "_";

  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const [isShowFormBudget, setIsShowFormBudget] = useState(false);

  useEffect(() => {
    if (!noPeriod) {
      getBudget(month, year);
    }
    // eslint-disable-next-line
  }, [noPeriod]);

  if (noPeriod) return <SelectPeriod />;

  if (ui.isLoading)
    return (
      <S.Container>
        <LoadingFallback />
      </S.Container>
    );

  if (!ui.isLoading && budget.data === null) return <NoBudget />;

  return (
    <S.Container>
      <S.Header>
        <AnggaranHeader
          onCreateBudget={() => setIsShowFormBudget(true)}
          onAddDetail={() => setIsShowModalDetail(true)}
        />
      </S.Header>
      <S.Body>
        <AnggaranList records={budget.details} />
      </S.Body>

      {isShowFormBudget && (
        <FormBudget
          handleClose={() => setIsShowFormBudget(false)}
          isUpdate={true}
        />
      )}

      {isShowModalDetail && (
        <FormModalDetail
          budget={budget}
          handleClose={() => setIsShowModalDetail(false)}
        />
      )}
    </S.Container>
  );
};

export default Anggaran;
