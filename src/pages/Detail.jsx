import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormModal from "../components/FormModal";
import { currencyFormat } from "../helpers/currency-format";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [used, setUsed] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormData] = useState({
    item: "",
    value: 0,
  });

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

  const onSubmit = async () => {
    if (formData.item === "" || formData.value === 0) {
      setIsShowModal(false);
      alert("Data tidak valid!");
      return;
    }

    let newRecord;
    if (record?.details?.length > 0 ?? false) {
      newRecord = {
        ...record,
        details: [
          ...record.details,
          { item: formData.item, value: formData.value },
        ],
      };
    } else {
      const detail = [{ item: formData.item, value: formData.value }];
      newRecord = { ...record, details: detail };
    }

    try {
      await setDoc(doc(db, "records", `${record.id}`), newRecord);
    } catch (err) {
      alert(err);
    }

    setRecord(newRecord);
    setFormData({
      ...formData,
      item: "",
      value: 0,
    });
    setIsShowModal(false);
  };

  const onDeleteDetail = async (index) => {
    if (window.confirm("Yakin ingin dihapus?")) {
      const newDetails = [];
      record.details.forEach((detail, i) => {
        if (i != index) newDetails.push(detail);
      });
      const newRecord = { ...record, details: newDetails };
      try {
        await setDoc(doc(db, "records", `${record.id}`), newRecord);
      } catch (err) {
        alert(err);
      }
      setRecord(newRecord);
    }
  };

  useEffect(() => {
    if (state != null) setRecord(state);
  }, [state]);

  useEffect(() => {
    if (record?.details?.length > 0 ?? false) {
      let newUsedValue = 0;
      record.details.forEach((item) => {
        newUsedValue += item.value;
      });
      setUsed(newUsedValue);
    }
  }, [record]);

  return (
    <div className="container">
      {record == null ? (
        <div>Loading...</div>
      ) : (
        <>
          <button
            type="button"
            className="btn btn-secondary btn-sm mb-2"
            onClick={() => navigate("/anggaran")}
          >
            Kembali
          </button>
          <div className="alert alert-info d-flex flex-row justify-content-between">
            <div>
              <h6 className="p-0 m-0">{record.item}</h6>
              <p className="m-0 p-0">
                Anggaran Rp. {currencyFormat(record.value)}
              </p>
              {/* <p className="m-0 p-0 text-success">
                Terpakai Rp. {currencyFormat(used)}
              </p> */}
              <p className="m-0 p-0 text-danger">
                Sisa Rp. {currencyFormat(record.value - used)}
              </p>
            </div>
            <div
              className="bg-success"
              style={{
                color: "white",
                fontSize: 24,
                width: 40,
                height: 40,
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setIsShowModal(true);
              }}
            >
              +
            </div>
          </div>
          {record?.details?.length > 0 &&
            record.details.map((detail, index) => (
              <div
                key={`detail_${index}`}
                className="alert alert-warning p-2 mb-2 d-flex flex-row justify-content-between"
              >
                <div>
                  <p className="p-0 m-0">{detail.item}</p>
                  <p className="m-0 p-0">Rp. {currencyFormat(detail.value)}</p>
                </div>
                <div
                  className="bg-danger"
                  style={{
                    color: "white",
                    fontSize: 18,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => onDeleteDetail(index)}
                >
                  -
                </div>
              </div>
            ))}
        </>
      )}

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
};

export default Detail;
