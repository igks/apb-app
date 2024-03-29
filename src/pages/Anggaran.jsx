import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import AnggaranHeader from "components/anggaran/AnggaranHeader";
import AnggaranList from "components/anggaran/AnggaranList";
import NoBudget from "components/anggaran/NoBudget";
import FormBudget from "components/forms/FormBudget";
import LoadingFallback from "components/shared/LoadingFallback";
import { getBudget } from "services/budget";
import FormModalDetail from "../components/forms/FormModalDetail";
import { default as SelectPeriod } from "../components/shared/common/SelectPeriod";
import { usePeriodStore } from "../zustand/periodStore";
import { useBudgetStore } from "./../zustand/budgetStore";
import { useUiStore } from "./../zustand/uiStore";
import * as S from "./styled.component";

const Anggaran = () => {
  const { month, year } = usePeriodStore((state) => state.period);
  const resetPeriod = usePeriodStore((state) => state.resetPeriod);
  const budget = useBudgetStore((state) => state.budget);
  const ui = useUiStore((state) => state.ui);
  console.log("🚀 ~ Anggaran ~ budget:", budget);

  const noPeriod = month === "_" || year === "_";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const [isShowFormBudget, setIsShowFormBudget] = useState(false);
  const [isShowOptionModal, setIsShowOptionModal] = useState({
    record: null,
    status: false,
  });
  const [records, setRecord] = useState([]);

  // const [formData, setFormData] = useState({
  //   id: null,
  //   item: "",
  //   value: 0,
  //   isApprove: true,
  //   details: [],
  // });
  // const [bulan, setBulan] = useState("Pilih bulan");

  // const [formConfig, setFormConfig] = useState({
  //   id: id,
  //   income: income,
  //   carryForward: carryForward,
  // });

  // const updateFormConfig = (e) => {
  //   let targetName = e.target.name;
  //   let parsed = parseInt(e.target.value);
  //   if (isNaN(parsed)) {
  //     setFormConfig({
  //       ...formConfig,
  //       [targetName]: 0,
  //     });
  //   } else {
  //     setFormConfig({
  //       ...formConfig,
  //       [targetName]: parsed,
  //     });
  //   }
  // };

  // const submitConfig = async () => {
  //   const { isSuccess, error } = await updateConfig(formConfig);
  //   if (!isSuccess) {
  //     alert(error);
  //   }
  //   setIsShowFormBudget(false);
  //   dispatch({
  //     type: GET_ANGGARAN_HEADER_REQUESTED,
  //     payload: {
  //       records: list.data,
  //     },
  //   });
  // };

  // const getAnggaran = async () => {};

  // const onSubmit = async () => {
  //   const { isValid, error } = await addAnggaran(formData);

  //   if (!isValid) {
  //     alert("Data tidak valid!");
  //     setIsShowModal(false);
  //   }

  //   if (error) {
  //     alert(error);
  //     setIsShowModal(false);
  //   }

  //   setFormData({
  //     ...formData,
  //     id: null,
  //     item: "",
  //     value: 0,
  //     isApprove: true,
  //     details: [],
  //   });
  //   setIsShowModal(false);
  //   getAnggaran();
  // };

  // const updateFormData = (e) => {
  //   let targetName = e.target.name;
  //   if (targetName === "item") {
  //     setFormData({
  //       ...formData,
  //       [targetName]: e.target.value,
  //     });
  //   }
  //   if (targetName === "value") {
  //     let parsed = parseInt(e.target.value);
  //     if (isNaN(parsed)) {
  //       setFormData({
  //         ...formData,
  //         [targetName]: 0,
  //       });
  //     } else {
  //       setFormData({
  //         ...formData,
  //         [targetName]: parsed,
  //       });
  //     }
  //   }
  // };

  // const onAddData = () => {
  //   setFormData({
  //     ...formData,
  //     item: "",
  //     value: 0,
  //     isApprove: true,
  //     bulan: bulan,
  //   });
  //   setIsShowModal(true);
  // };

  // const onUpdate = (record) => {
  //   setFormData({
  //     ...formData,
  //     id: record.id,
  //     item: record.item,
  //     value: record.value,
  //     isApprove: record.isApprove,
  //     bulan: record.bulan,
  //   });

  //   setIsShowOptionModal({
  //     ...isShowOptionModal,
  //     record: null,
  //     status: false,
  //   });

  //   setIsShowModal(true);
  // };

  // const onDelete = async (id) => {
  //   setIsShowOptionModal({
  //     ...isShowOptionModal,
  //     record: null,
  //     status: false,
  //   });

  //   if (window.confirm("Hapus data?")) {
  //     const isSuccess = await deleteAnggaran(id);
  //     if (isSuccess) {
  //       getAnggaran();
  //       // updateHeader();
  //     }
  //   }
  // };

  // const goToDetail = (record) => {
  //   navigate("/detail", { state: { data: record, month: bulan } });
  //   setIsShowOptionModal({
  //     ...isShowOptionModal,
  //     record: null,
  //     status: false,
  //   });
  // };

  // const handleOptionModal = (record, status) => {
  //   setIsShowOptionModal({
  //     ...isShowOptionModal,
  //     record: record,
  //     status: status,
  //   });
  // };

  // useEffect(() => {
  //   setFormConfig({
  //     id: id,
  //     income: income,
  //     carryForward: carryForward,
  //   });
  // }, [config]);

  useEffect(() => {
    if (!noPeriod) {
      getBudget(month, year);
    }
    // eslint-disable-next-line
  }, [noPeriod]);

  useEffect(() => {
    // updateHeader();
    // eslint-disable-next-line
  }, [records]);

  // useEffect(() => {
  //   if (state != null || state != undefined) {
  //     setBulan(state);
  //   }
  //   // eslint-disable-next-line
  // }, [state]);

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
        <AnggaranList records={budget.details} handleOptionModal={() => {}} />

        {/* {isShowOptionModal.status && (
          <OptionModal
            onClickCloseButton={() => handleOptionModal(null, false)}
            onClickList={() => goToDetail(isShowOptionModal.record)}
            onClickEdit={() => onUpdate(isShowOptionModal.record)}
            onClickDelete={() => onDelete(isShowOptionModal.record.id)}
          />
        )} */}
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
