import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";
import { currencyFormat } from "../helpers/currency-format";
import ListCard from "../components/ListCard";
import FormModal from "../components/FormModal";

function Anggaran() {
  const navigate = useNavigate();

  const [isShowModal, setIsShowModal] = useState(false);
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

  const optionBulan = [
    "Pilih bulan",
    "Januari",
    "Pebruari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "Nopember",
    "Desember",
  ];

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
    if (formData.item === "" || formData.value === 0) {
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
    setIsShowModal(true);
  };

  const onDelete = async (id) => {
    if (window.confirm("Hapus data?")) {
      await deleteDoc(doc(db, "records", id));
      loadRecord();
    }
    calculateTotal();
  };

  const onToggleStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "records", id), {
        isApprove: status,
      });
    } catch (err) {
      alert(err);
    }
    loadRecord();
    calculateTotal();
  };

  useEffect(() => {
    loadRecord();
    // eslint-disable-next-line
  }, [bulan]);

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line
  }, [records]);

  return (
    <div className="container">
      {bulan === "Pilih bulan" ? (
        <>
          <div style={{ width: "100%", margin: "auto" }}>
            <select onChange={(e) => setBulan(e.target.value)}>
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
          <div className="alert alert-info" role="alert">
            <strong>Total: </strong> <span>Rp. {currencyFormat(total)}</span>
            <br />
            <strong className="text-danger">Sisa: </strong>{" "}
            <span className="text-danger">
              Rp. {currencyFormat(total - used)}
            </span>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center px-3">
            <h6 className="btn btn-sm">Anggaran {bulan.toUpperCase()}</h6>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onAddData}
            >
              Tambah
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/")}
            >
              Kembali
            </button>
          </div>
          <div style={{ height: "70vh", overflow: "auto" }}>
            <ul className="p-0 m-0">
              {records.length > 0 &&
                records.map((record, index) => (
                  <ListCard
                    key={index}
                    record={record}
                    onToggleStatus={onToggleStatus}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
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
        </>
      )}
    </div>
  );
}

export default Anggaran;
