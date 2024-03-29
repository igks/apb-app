import FormModalExpense from "components/forms/FormModalExpense";
import {
  AddFileIcon,
  DeleteIcon,
  GoBackIcon,
  RemainIcon,
  WalletIcon,
} from "components/shared/Icons";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteExpense } from "services/expense";
import LoadingFallback from "../components/shared/LoadingFallback/index";
import { Colors } from "../constants";
import { currencyFormat } from "../helpers/currency-format";
import { useBudgetStore } from "./../zustand/budgetStore";
import * as S from "./styled.component";

const Detail = () => {
  const { state } = useLocation();
  const { expense } = useBudgetStore((state) => state.budget);
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [compiledDetails, setCompiledDetails] = useState([]);
  const [keyReference, setSetKeyReference] = useState([]);
  const [used, setUsed] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);

  const onDeleteDetail = async (id) => {
    if (window.confirm("Yakin ingin dihapus?")) {
      await deleteExpense(id, state.data.id);
    }
  };

  useEffect(() => {
    if (state.data != null) {
      setRecord(state.data);
    }
  }, [state]);

  useEffect(() => {
    if (expense?.length > 0 ?? false) {
      let newUsedValue = 0;
      expense.forEach((item) => {
        newUsedValue += parseInt(item.value);
      });
      setUsed(newUsedValue);
    } else {
      setUsed(0);
    }

    if (expense != null) {
      const objectDetails = _.groupBy(expense, (ex) => {
        return ex.date;
      });
      const sortedDetails = Object.keys(objectDetails).sort((a, b) => b - a);
      setCompiledDetails(objectDetails);
      setSetKeyReference(sortedDetails);
    }
  }, [expense]);

  return (
    <S.Container>
      {record == null ? (
        <LoadingFallback />
      ) : (
        <>
          <S.Header>
            <S.Row mb={"10px"}>
              <GoBackIcon
                size="xl"
                color={Colors.grey}
                onClick={() => navigate("/anggaran")}
              />
              <S.Title>{record.name}</S.Title>
              <AddFileIcon
                size="xl"
                color={Colors.green}
                onClick={() => setIsShowModal(true)}
              />
            </S.Row>
            <div className="row mb-3">
              <div className="col px-2">
                <div className="col alert alert-success p-1 mb-0" role="alert">
                  <WalletIcon size="1x" />{" "}
                  <span> {currencyFormat(parseInt(record.value))}</span>
                </div>
              </div>
              <div className="col px-2">
                <div className="col alert alert-danger p-1 mb-0" role="alert">
                  <RemainIcon size="1x" />
                  <span> {currencyFormat(record.value - used)}</span>
                </div>
              </div>
            </div>
            <S.Divider />
          </S.Header>
          <S.Body>
            {keyReference.length > 0 &&
              keyReference.map((key) => (
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
                          <small className="p-0 m-0">{detail.name}</small>
                        </div>
                        <div>
                          <small className="m-0 p-0">
                            {currencyFormat(parseInt(detail.value))}
                          </small>
                        </div>
                      </div>
                      <DeleteIcon
                        color={Colors.red}
                        size="lg"
                        onClick={() => onDeleteDetail(detail.id)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            {isShowModal && (
              <FormModalExpense
                record={state.data}
                handleClose={() => setIsShowModal(false)}
              />
            )}
          </S.Body>
        </>
      )}
    </S.Container>
  );
};
export default Detail;
