import React, { useEffect, useState } from "react";
import { db } from "./services/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";

function App() {
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
      });
    });

    setRecord(newRecords);
  };

  const calculateTotal = () => {
    if (records.length === 0) return;

    let sum = 0;
    records.forEach((record) => {
      if (record.isApprove) {
        sum += record.value;
      }
    });

    setTotal(sum);
  };

  const currencyFormat = (value) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
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
      <div className="text-center my-2">
        <h4>Anggaran Pengeluaran Bulanan</h4>
        <hr />
      </div>
      <div className="alert alert-info" role="alert">
        <strong>Total: </strong> <span>Rp. {currencyFormat(total)}</span>
      </div>
      <hr />
      <h6>Details:</h6>
      <div style={{ height: 600, overflow: "auto" }}>
        <ul className="p-0 m-0">
          {records.length > 0 &&
            records.map((record, index) => (
              <div
                key={index}
                style={{
                  margin: "5px",
                  padding: "10px",
                  borderRadius: 10,
                }}
                className={
                  records.length > 0 && record.isApprove
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="p-0 m-0">{record.item}</h6>
                  <p className="p-0 m-0">
                    {records.length > 0 && record.isApprove
                      ? "Approve"
                      : "Pending"}
                  </p>
                </div>
                <p className="m-0 p-0">Rp. {currencyFormat(record.value)}</p>
                <hr />
                <div className="m-0 p-0 d-flex justify-content-around">
                  <span
                    className="badge bg-primary"
                    onClick={() => onToggleStatus(record.id, !record.isApprove)}
                  >
                    {records.length > 0 && record.isApprove
                      ? "Pending"
                      : "Approve"}
                  </span>
                  <span
                    className="badge bg-info"
                    onClick={() => onUpdate(record)}
                  >
                    Update
                  </span>
                  <span
                    className="badge bg-danger"
                    onClick={() => onDelete(record.id)}
                  >
                    Delete
                  </span>
                </div>
              </div>
            ))}
        </ul>
      </div>
      <hr />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          setFormData({
            ...formData,
            item: "",
            value: 0,
            isApprove: true,
          });
          setIsShowModal(true);
        }}
      >
        Tambah
      </button>

      {isShowModal && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="mx-2 w-100">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {formData.id == null ? "Tambah" : "Edit"} Item
                </h5>
              </div>

              <div className="px-3 mb-3">
                <p className="p-0 m-0">Nama Item</p>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={formData.item}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      item: e.target.value,
                    })
                  }
                />
              </div>

              <div className="px-3 mb-3">
                <p className="p-0 m-0">Jumlah</p>
                <input
                  className="form-control form-control-sm"
                  type="number"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      value: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsShowModal(false)}
                >
                  Tutup
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
