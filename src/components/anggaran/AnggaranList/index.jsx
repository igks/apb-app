import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDetail } from "services/budgetDetail";
import { getExpense } from "services/expense";
import { useBudgetStore } from "./../../../zustand/budgetStore";
import OptionModal from "./../../shared/OptionModal/index";
import ListCard from "./ListCard";
import * as S from "./styled.component";

const AnggaranList = ({ records }) => {
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const receiveExpense = useBudgetStore((state) => state.receiveExpense);

  const goToDetail = async (record) => {
    setShowOption(false);
    const expense = await getExpense(record.id);
    receiveExpense(expense);
    navigate("/detail", { state: { data: record } });
  };

  const onDeleteDetail = async () => {
    if (window.confirm("Yakin ingin dihapus?")) {
      deleteDetail(selectedItem);
    }
  };

  return (
    <>
      <S.List>
        {records.length > 0 &&
          records.map((record, index) => (
            <ListCard
              key={index}
              record={record}
              onEllipsisClicked={() => {
                setSelectedItem(record);
                setShowOption(true);
              }}
            />
          ))}
      </S.List>
      {showOption && (
        <OptionModal
          // onClickCloseButton={() => handleOptionModal(null, false)}
          // onClickList={() => goToDetail(isShowOptionModal.record)}
          // onClickEdit={() => onUpdate(isShowOptionModal.record)}
          // onClickDelete={() => onDelete(isShowOptionModal.record.id)}
          onClickCloseButton={() => setShowOption(false)}
          onClickList={() => goToDetail(selectedItem)}
          onClickEdit={() => {}}
          onClickDelete={onDeleteDetail}
        />
      )}
    </>
  );
};

export default AnggaranList;
