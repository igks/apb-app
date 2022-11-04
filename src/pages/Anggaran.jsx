import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";
import ListCard from "../components/ListCard";
import FormModal from "../components/FormModal";
import { AddFileIcon, GoBackIcon } from "../components/Icons";
import { Colors, optionBulan } from "../constants";
import AnggaranHeader from "../components/AnggaranHeader";
import OptionModal from "../components/OptionModal";
import { mock, compileRecord } from "../services/mock";

function Anggaran() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowOptionModal, setIsShowOptionModal] = useState({
    record: null,
    status: false,
  });
  const [records, setRecord] = useState([]);
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

  const loadRecord = async () => {
    const q = query(
      collection(db, "records"),
      where("bulan", "==", bulan),
      orderBy("item")
    );
    const querySnapshot = await getDocs(q);
    const newRecords = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();

      newRecords.push({
        id: doc.id,
        item: data.item,
        value: data.value,
        isApprove: data.isApprove,
        details: data.details,
        bulan: data.bulan,
      });
    });

    setRecord(newRecords);
  };

  const calculateTotal = () => {
    let sum = 0;
    let used = 0;
    records.forEach((record) => {
      if (record.isApprove) {
        sum += record.value;
        if (record?.details?.length > 0 ?? false) {
          record.details.forEach((detail) => {
            used += detail.value;
          });
        }
      }
    });

    setTotal(sum);
    setUsed(used);
  };

  const onSubmit = async () => {
    if (formData.item === "" || formData.value < 0) {
      setIsShowModal(false);
      alert("Data tidak valid!");
      return;
    }

    if (formData.id != null) {
      try {
        await updateDoc(doc(db, "records", `${formData.id}`), {
          item: formData.item,
          value: formData.value,
        });
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        await addDoc(collection(db, "records"), formData);
      } catch (err) {
        alert(err);
      }
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
    loadRecord();
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
      await deleteDoc(doc(db, "records", id));
      loadRecord();
    }
    calculateTotal();
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
    loadRecord();
    // eslint-disable-next-line
  }, [bulan]);

  useEffect(() => {
    calculateTotal();
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
        <>
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
              onChange={(e) => setBulan(e.target.value)}
            >
              {optionBulan.map((bln) => (
                <option key={bln} value={bln.toLowerCase()}>
                  {bln}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <AnggaranHeader total={total} used={used} />
          <hr />
          <div className="d-flex justify-content-between align-items-center px-1 mb-1">
            <div onClick={() => navigate("/")}>
              <GoBackIcon size="xl" color={Colors.grey} />
            </div>
            <h6 className="text-center">{bulan.toUpperCase()}</h6>
            <div onClick={onAddData}>
              <AddFileIcon size="xl" color={Colors.green} />
            </div>
          </div>
          <div style={{ height: "60vh", overflow: "auto" }}>
            <ul className="p-0 m-0">
              {records.length > 0 &&
                records.map((record, index) => (
                  <ListCard
                    key={index}
                    record={record}
                    onEllipsisClicked={handleOptionModal}
                  />
                ))}
            </ul>
          </div>

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
