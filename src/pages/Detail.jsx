import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormModal from "../components/forms/FormModal";
import { currencyFormat } from "../helpers/currency-format";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import {
  AddFileIcon,
  DeleteIcon,
  GoBackIcon,
  RemainIcon,
  WalletIcon,
} from "../components/Icons";
import { Colors } from "../constants";
import _ from "lodash";

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [compiledDetails, setCompiledDetails] = useState([]);
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
    if (formData.item === "" || formData.value < 0) {
      setIsShowModal(false);
      alert("Data tidak valid!");
      return;
    }

    let newRecord;
    let date = new Date().getDate();
    if (record?.details?.length > 0 ?? false) {
      newRecord = {
        ...record,
        details: [
          ...record.details,
          { item: formData.item, value: formData.value, tanggal: date },
        ],
      };
    } else {
      const detail = [
        { item: formData.item, value: formData.value, tanggal: date },
      ];
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
    if (state.data != null) {
      setRecord(state.data);
    }
  }, [state]);

  useEffect(() => {
    if (record?.details?.length > 0 ?? false) {
      let newUsedValue = 0;
      record.details.forEach((item) => {
        newUsedValue += item.value;
      });
      setUsed(newUsedValue);
    }

    if (record != null) {
      const objectDetails = _.groupBy(record.details, (detail) => {
        return detail.tanggal;
      });
      setCompiledDetails(objectDetails);
    }
  }, [record]);

  return (
    <div className="container">
      {record == null ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="d-flex flex-row justify-content-between mb-3">
            <GoBackIcon
              size="lg"
              color={Colors.grey}
              onClick={() => navigate("/anggaran", { state: state.month })}
            />
            <h6 className="p-0 m-0">{record.item}</h6>
            <AddFileIcon
              size="lg"
              color={Colors.green}
              onClick={() => {
                setIsShowModal(true);
              }}
            />
          </div>

          <div className="row mb-3">
            <div className="col px-2">
              <div className="col alert alert-success p-1 mb-0" role="alert">
                <WalletIcon size="1x" />{" "}
                <span> {currencyFormat(record.value)}</span>
              </div>
            </div>
            <div className="col px-2">
              <div className="col alert alert-danger p-1 mb-0" role="alert">
                <RemainIcon size="1x" />
                <span> {currencyFormat(record.value - used)}</span>
              </div>
            </div>
          </div>

          {Object.keys(compiledDetails).length > 0 &&
            Object.keys(compiledDetails).map((key) => (
              <div key={key} className="mb-2">
                <small>Tanggal : {key}</small>
                <hr className="m-0 mb-2" />
                {compiledDetails[key].map((detail, index) => (
                  <div
                    key={`detail_${index}`}
                    className="alert alert-warning p-1 mb-2 d-flex flex-row justify-content-between align-items-center px-2"
                  >
                    <div className="d-flex flex-column justify-content-between">
                      <div>
                        <small className="p-0 m-0">{detail.item}</small>
                      </div>
                      <div>
                        <small className="m-0 p-0">
                          {currencyFormat(detail.value)}
                        </small>
                      </div>
                    </div>
                    <DeleteIcon
                      color={Colors.red}
                      size="lg"
                      onClick={() => onDeleteDetail(index)}
                    />
                  </div>
                ))}
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
