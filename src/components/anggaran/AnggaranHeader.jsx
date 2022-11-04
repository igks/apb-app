import React from "react";
import { currencyFormat } from "helpers/currency-format";
import {
  BalanceIcon,
  CarryForwardIcon,
  IncomeIcon,
  UnAllocatedIcon,
  AddFileIcon,
  GoBackIcon,
} from "components/Icons";
import { Colors } from "constants";

const AnggaranHeader = ({
  config = null,
  total,
  used,
  onBack,
  onAdd,
  bulan,
}) => {
  return (
    <>
      <div className="row">
        <div className="col px-2">
          <div className="col alert alert-success p-1 mb-2" role="alert">
            <IncomeIcon size="1x" onClick={() => alert("update income")} />{" "}
            <span> {config != null ? currencyFormat(config.income) : "-"}</span>
          </div>
        </div>
        <div className="col px-2">
          <div className="col alert alert-info p-1 mb-2" role="alert">
            <CarryForwardIcon size="1x" onClick={() => alert("update saldo")} />
            <span> {config != null ? currencyFormat(config.saldo) : "-"}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col px-2">
          <div className="col alert alert-danger p-1 mb-0" role="alert">
            <BalanceIcon size="1x" />{" "}
            <span> {config != null ? currencyFormat(total) : "-"}</span>
          </div>
        </div>
        <div className="col px-2">
          <div className="col alert alert-warning p-1 mb-0" role="alert">
            <UnAllocatedIcon size="1x" /> <span> {currencyFormat(total)}</span>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-between align-items-center px-1 mb-1">
        <div onClick={onBack}>
          <GoBackIcon size="xl" color={Colors.grey} />
        </div>
        <h6 className="text-center">{bulan.toUpperCase()}</h6>
        <div onClick={onAdd}>
          <AddFileIcon size="xl" color={Colors.green} />
        </div>
      </div>
    </>
  );
};

export default AnggaranHeader;
