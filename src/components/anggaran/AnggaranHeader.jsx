import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ANGGARAN_HEADER_REQUESTED } from "redux/actions/anggaran-action";
import { currencyFormat } from "helpers/currency-format";
import {
  BalanceIcon,
  CarryForwardIcon,
  IncomeIcon,
  UnAllocatedIcon,
  AddFileIcon,
  GoBackIcon,
  SettingIcon,
} from "components/Icons";
import { Colors } from "constants";
import { updateConfig } from "services/anggaran";

const AnggaranHeader = ({
  data,
  onBack,
  onAdd,
  bulan,
  setIsShowFormConfig,
}) => {
  const dispatch = useDispatch();

  const { config, list } = useSelector((state) => state.anggaran);
  const { id, income, carryForward, sum, used } =
    !config.isFetching && config.data;
  const balance = sum - used;
  const unUsed = income + carryForward - sum;

  const [dataHeader, setDataHeader] = useState({
    id: null,
    income: 0,
    carryForward: 0,
    sum: 0,
    used: 0,
  });

  const getConfig = () => {
    dispatch({
      type: GET_ANGGARAN_HEADER_REQUESTED,
      payload: {
        records: list.data,
      },
    });
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <>
      {config.isFetching ? (
        <h5>Loading...</h5>
      ) : (
        <>
          <div className="row">
            <div className="col px-2">
              <div className="col alert alert-success p-1 mb-2" role="alert">
                <IncomeIcon size="1x" /> <span> {currencyFormat(income)}</span>
              </div>
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              <SettingIcon
                size="lg"
                onClick={() => setIsShowFormConfig(true)}
              />
            </div>
            <div className="col px-2">
              <div className="col alert alert-info p-1 mb-2" role="alert">
                <CarryForwardIcon size="1x" />
                <span> {currencyFormat(carryForward)}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col px-2">
              <div className="col alert alert-danger p-1 mb-0" role="alert">
                <BalanceIcon size="1x" />{" "}
                <span> {currencyFormat(balance)}</span>
              </div>
            </div>
            <div className="col px-2">
              <div className="col alert alert-warning p-1 mb-0" role="alert">
                <UnAllocatedIcon size="1x" />{" "}
                <span> {currencyFormat(unUsed)}</span>
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
      )}
    </>
  );
};

export default AnggaranHeader;
