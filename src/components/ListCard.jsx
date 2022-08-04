import React, { useState, useEffect } from "react";
import { currencyFormat } from "../helpers/currency-format";
import { useNavigate } from "react-router-dom";

const ListCard = ({ month, record, onToggleStatus, onUpdate, onDelete }) => {
  const navigate = useNavigate();

  const [used, setUsed] = useState(0);

  const goToDetail = (record) => {
    navigate("/detail", { state: { data: record, month } });
  };

  useEffect(() => {
    if (record?.details?.length > 0 ?? false) {
      let newUsedValue = 0;
      record.details.forEach((item) => {
        newUsedValue += item.value;
      });
      setUsed(newUsedValue);
    }
  }, []);

  return (
    <div
      style={{
        margin: "5px",
        padding: "10px",
        borderRadius: 10,
      }}
      className={
        record.isApprove ? "alert alert-success" : "alert alert-danger"
      }
      role="alert"
    >
      <div className="p-0">
        <h6 className="p-0 m-0">{record.item}</h6>
        <p className="m-0 p-0">Anggaran Rp. {currencyFormat(record.value)}</p>
        <p className="m-0 p-0 text-danger">
          Sisa Rp. {currencyFormat(record.value - used)}
        </p>
        {/* <p className="p-0 m-0">{record.isApprove ? "Approve" : "Pending"}</p> */}
      </div>
      <hr className="mt-1" />
      <div className="m-0 p-0 d-flex flex-row justify-content-around">
        <div className="badge bg-warning" onClick={() => goToDetail(record)}>
          Detail
        </div>
        {/* <div
          className="badge bg-primary"
          onClick={() => onToggleStatus(record.id, !record.isApprove)}
        >
          {record.isApprove ? "Pending" : "Approve"}
        </div> */}
        <div className="badge bg-info" onClick={() => onUpdate(record)}>
          Update
        </div>
        <div className="badge bg-danger" onClick={() => onDelete(record.id)}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default ListCard;
