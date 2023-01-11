import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import FormModal from "components/forms/FormModal";

import AnggaranHeader from "components/anggaran/AnggaranHeader";
import OptionModal from "components/shared/OptionModal";
import SelectMonth from "components/anggaran/SelectMonth";
import {
  addAnggaran,
  calculateTotal,
  deleteAnggaran,
  updateConfig,
} from "services/anggaran";
import AnggaranList from "components/anggaran/AnggaranList";
import {
  GET_ANGGARAN_HEADER_REQUESTED,
  GET_ANGGARAN_REQUESTED,
} from "redux/actions/anggaran-action";
import FormConfig from "components/forms/FormConfig";
import * as S from "./styled.component";
import LoadingFallback from "components/shared/LoadingFallback";

const Anggaran = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { config, list } = useSelector((state) => state.anggaran);
  const { id, income, carryForward } = !config.isFetching && config.data;

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowFormConfig, setIsShowFormConfig] = useState(false);
  const [isShowOptionModal, setIsShowOptionModal] = useState({
    record: null,
    status: false,
  });
  const [records, setRecord] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    item: "",
    value: 0,
    isApprove: true,
    details: [],
  });
  const [bulan, setBulan] = useState("Pilih bulan");

  const [formConfig, setFormConfig] = useState({
    id: id,
    income: income,
    carryForward: carryForward,
  });

  const updateFormConfig = (e) => {
    let targetName = e.target.name;
    let parsed = parseInt(e.target.value);
    if (isNaN(parsed)) {
      setFormConfig({
        ...formConfig,
        [targetName]: 0,
      });
    } else {
      setFormConfig({
        ...formConfig,
        [targetName]: parsed,
      });
    }
  };

  const submitConfig = async () => {
    const { isSuccess, error } = await updateConfig(formConfig);
    if (!isSuccess) {
      alert(error);
    }
    setIsShowFormConfig(false);
    dispatch({
      type: GET_ANGGARAN_HEADER_REQUESTED,
      payload: {
        records: list.data,
      },
    });
  };

  const getAnggaran = async () => {
    dispatch({
      type: GET_ANGGARAN_REQUESTED,
      payload: {
        bulan: bulan,
      },
    });
  };

  const updateHeader = () => {
    dispatch({
      type: GET_ANGGARAN_HEADER_REQUESTED,
      payload: {
        records: list.data,
      },
    });
  };

  const onSubmit = async () => {
    const { isValid, error } = await addAnggaran(formData);

    if (!isValid) {
      alert("Data tidak valid!");
      setIsShowModal(false);
    }

    if (error) {
      alert(error);
      setIsShowModal(false);
    }

    setFormData({
      ...formData,
      id: null,
      item: "",
      value: 0,
      isApprove: true,
      details: [],
    });
    setIsShowModal(false);
    getAnggaran();
  };

  const updateFormData = (e) => {
    let targetName = e.target.name;
    if (targetName === "item") {
      setFormData({
        ...formData,
        [targetName]: e.target.value,
      });
    }
    if (targetName === "value") {
      let parsed = parseInt(e.target.value);
      if (isNaN(parsed)) {
        setFormData({
          ...formData,
          [targetName]: 0,
        });
      } else {
        setFormData({
          ...formData,
          [targetName]: parsed,
        });
      }
    }
  };

  const onAddData = () => {
    setFormData({
      ...formData,
      item: "",
      value: 0,
      isApprove: true,
      bulan: bulan,
    });
    setIsShowModal(true);
  };

  const onUpdate = (record) => {
    setFormData({
      ...formData,
      id: record.id,
      item: record.item,
      value: record.value,
      isApprove: record.isApprove,
      bulan: record.bulan,
    });

    setIsShowOptionModal({
      ...isShowOptionModal,
      record: null,
      status: false,
    });

    setIsShowModal(true);
  };

  const onDelete = async (id) => {
    setIsShowOptionModal({
      ...isShowOptionModal,
      record: null,
      status: false,
    });

    if (window.confirm("Hapus data?")) {
      const isSuccess = await deleteAnggaran(id);
      if (isSuccess) {
        getAnggaran();
        updateHeader();
      }
    }
  };

  const goToDetail = (record) => {
    navigate("/detail", { state: { data: record, month: bulan } });
    setIsShowOptionModal({
      ...isShowOptionModal,
      record: null,
      status: false,
    });
  };

  const handleOptionModal = (record, status) => {
    setIsShowOptionModal({
      ...isShowOptionModal,
      record: record,
      status: status,
    });
  };

  useEffect(() => {
    setFormConfig({
      id: id,
      income: income,
      carryForward: carryForward,
    });
  }, [config]);

  useEffect(() => {
    if (bulan !== "Pilih bulan") getAnggaran();
    // eslint-disable-next-line
  }, [bulan]);

  useEffect(() => {
    updateHeader();
    // eslint-disable-next-line
  }, [records]);

  useEffect(() => {
    if (state != null || state != undefined) {
      setBulan(state);
    }
    // eslint-disable-next-line
  }, [state]);
  return (
    <>
      {bulan === "Pilih bulan" ? (
        <SelectMonth onSetMonth={setBulan} />
      ) : (
        <S.Container>
          {list.isFetching ? (
            <LoadingFallback />
          ) : (
            <>
              <S.Header>
                <AnggaranHeader
                  onBack={() => navigate("/")}
                  onAdd={onAddData}
                  bulan={bulan}
                  setIsShowFormConfig={setIsShowFormConfig}
                />
              </S.Header>
              <S.Body>
                <AnggaranList
                  records={list.data}
                  handleOptionModal={handleOptionModal}
                />

                {isShowModal && (
                  <FormModal
                    formData={formData}
                    updateFormData={updateFormData}
                    setIsShowModal={setIsShowModal}
                    onSubmit={onSubmit}
                  />
                )}

                {isShowOptionModal.status && (
                  <OptionModal
                    onClickCloseButton={() => handleOptionModal(null, false)}
                    onClickList={() => goToDetail(isShowOptionModal.record)}
                    onClickEdit={() => onUpdate(isShowOptionModal.record)}
                    onClickDelete={() => onDelete(isShowOptionModal.record.id)}
                  />
                )}

                {isShowFormConfig && (
                  <FormConfig
                    formData={formConfig}
                    updateFormData={updateFormConfig}
                    setIsShowModal={setIsShowFormConfig}
                    onSubmit={submitConfig}
                  />
                )}
              </S.Body>
            </>
          )}
        </S.Container>
      )}
    </>
  );
};

export default Anggaran;
