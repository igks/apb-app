import React from "react";
import { currencyFormat } from "../helpers/currency-format";

const ListCard = ({ record, onToggleStatus, onUpdate, onDelete }) => {
  return (
    <div
      style={{
        margin: "5px",
        padding: "10px",
        borderRadius: 10,
      }}
      className={
        record.isApprove
          ? "d-flex flex-row justify-content-between alert alert-success"
          : "d-flex flex-row justify-content-between alert alert-danger"
      }
      role="alert"
    >
      <div>
        <h6 className="p-0 m-0">{record.item}</h6>
        <p className="m-0 p-0">Rp. {currencyFormat(record.value)}</p>
        <p className="p-0 m-0">{record.isApprove ? "Approve" : "Pending"}</p>
      </div>
      <div className="m-0 p-0 d-flex flex-column justify-content-between">
        <div
          className="badge bg-primary"
          onClick={() => onToggleStatus(record.id, !record.isApprove)}
        >
          {record.isApprove ? "Pending" : "Approve"}
        </div>
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
