import React, { useState, useEffect } from "react";
import { currencyFormat } from "../helpers/currency-format";
import { EllipsisIcon, RemainIcon, WalletIcon } from "./Icons";
import { Colors } from "../constants";

const ListCard = ({ record, onEllipsisClicked }) => {
  const [used, setUsed] = useState(0);

  useEffect(() => {
    if (record?.details?.length > 0 ?? false) {
      let newUsedValue = 0;
      record.details.forEach((item) => {
        newUsedValue += item.value;
      });
      setUsed(newUsedValue);
    }
    // eslint-disable-next-line
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
        <div className="mb-1 d-flex flex-row justify-content-between">
          <p className="p-0 m-0 " style={{ fontSize: 15, fontWeight: "bold" }}>
            {record.item}
          </p>
          <EllipsisIcon
            color={Colors.grey}
            size="lg"
            onClick={() => onEllipsisClicked(record, true)}
          />
        </div>
        <div className="row">
          <div className="col">
            <p className="m-0 p-0" style={{ fontSize: 14 }}>
              <WalletIcon /> {currencyFormat(record.value)}
            </p>
          </div>
          <div className="col">
            <p className="m-0 p-0 text-danger" style={{ fontSize: 14 }}>
              <RemainIcon /> {currencyFormat(record.value - used)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
