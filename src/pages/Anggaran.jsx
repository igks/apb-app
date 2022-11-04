import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormModal from "components/FormModal";

import AnggaranHeader from "components/anggaran/AnggaranHeader";
import OptionModal from "components/OptionModal";
import SelectMonth from "components/anggaran/SelectMonth";
import {
  addAnggaran,
  calculateTotal,
  deleteAnggaran,
  loadAnggaranList,
  loadConfig,
} from "services/anggaran";
import AnggaranList from "components/anggaran/AnggaranList";

function Anggaran() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowOptionModal, setIsShowOptionModal] = useState({
    record: null,
    status: false,
  });
  const [records, setRecord] = useState([]);
  const [config, setConfig] = useState(null);
  const [total, setTotal] = useState(0);
  const [used, setUsed] = useState(0);
  const [formData, setFormData] = useState({
    id: null,
    item: "",
    value: 0,
    isApprove: true,
    details: [],
  });
  const [bulan, setBulan] = useState("Pilih bulan");

  const getConfig = async () => {
    const { isSuccess, data } = await loadConfig();
    if (isSuccess) setConfig(data);
  };

  const getAnggaran = async () => {
    const records = await loadAnggaranList(bulan);
    setRecord(records);
  };

  const getCalculation = () => {
    const { sum, used } = calculateTotal(records);
    setTotal(sum);
    setUsed(used);
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
        getCalculation();
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
    getAnggaran();
    getConfig();
    // eslint-disable-next-line
  }, [bulan]);

  useEffect(() => {
    getCalculation();
    // eslint-disable-next-line
  }, [records]);

  useEffect(() => {
    if (state != null || state != undefined) {
      setBulan(state);
    }
    // eslint-disable-next-line
  }, [state]);

  return (
    <div className="container">
      {bulan === "Pilih bulan" ? (
        <SelectMonth onSetMonth={setBulan} />
      ) : (
        <>
          <AnggaranHeader
            config={config}
            total={total}
            used={used}
            onBack={() => navigate("/")}
            onAdd={onAddData}
            bulan={bulan}
          />

          <AnggaranList
            records={records}
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
        </>
      )}
    </div>
  );
}

export default Anggaran;
