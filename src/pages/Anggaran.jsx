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
  getDoc,
} from "firebase/firestore";
import { currencyFormat } from "../helpers/currency-format";
import ListCard from "../components/ListCard";
import FormModal from "../components/FormModal";

function Anggaran() {
  const navigate = useNavigate();

  const [isShowModal, setIsShowModal] = useState(false);
  const [records, setRecord] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    id: null,
    item: "",
    value: 0,
    isApprove: true,
  });

  const loadRecord = async () => {
    const q = query(collection(db, "records"));
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
      });
    });

    setRecord(newRecords);
  };

  const calculateTotal = () => {
    let sum = 0;
    records.forEach((record) => {
      if (record.isApprove) {
        sum += record.value;
      }
    });

    setTotal(sum);
  };

  const onSubmit = async () => {
    if (formData.item === "" || formData.value === 0) {
      setIsShowModal(false);
      alert("Data tidak valid!");
      return;
    }

    if (formData.id != null) {
      try {
        await setDoc(doc(db, "records", `${formData.id}`), formData);
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
  }, []);

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line
  }, [records]);

  return (
    <div className="container">
      <div className="alert alert-info" role="alert">
        <strong>Total: </strong> <span>Rp. {currencyFormat(total)}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center px-3">
        <h6 className="btn btn-sm">Daftar Anggaran:</h6>
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
    </div>
  );
}

export default Anggaran;
