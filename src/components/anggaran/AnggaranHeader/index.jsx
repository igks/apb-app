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
import * as S from "./styled.component";
import Spinner from "components/shared/Spinner";

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
        <Spinner loading={config.isFetching} />
      ) : (
        <>
          <S.Row mb="5px">
            <S.Card color="#c8e6c9" onClick={() => setIsShowFormConfig(true)}>
              <IncomeIcon size="1x" /> <span> {currencyFormat(income)}</span>
            </S.Card>
            <S.Card color="#bbdefb" onClick={() => setIsShowFormConfig(true)}>
              <CarryForwardIcon size="1x" />
              <span> {currencyFormat(carryForward)}</span>
            </S.Card>
          </S.Row>
          <S.Row>
            <S.Card color="#ffcdd2">
              <BalanceIcon size="1x" /> <span> {currencyFormat(balance)}</span>
            </S.Card>
            <S.Card color="#ffe57f">
              <UnAllocatedIcon size="1x" />{" "}
              <span> {currencyFormat(unUsed)}</span>
            </S.Card>
          </S.Row>
          <S.Divider />
          <S.Row>
            <GoBackIcon size="xl" color={Colors.grey} onClick={onBack} />
            <S.Title>{bulan.toUpperCase()}</S.Title>
            <AddFileIcon size="xl" color={Colors.green} onClick={onAdd} />
          </S.Row>
          <S.Divider />
        </>
      )}
    </>
  );
};

export default AnggaranHeader;
