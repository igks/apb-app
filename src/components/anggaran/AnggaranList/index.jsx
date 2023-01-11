import React from "react";
import * as S from "./styled.component";
import ListCard from "./ListCard";

const AnggaranList = ({ records, handleOptionModal }) => {
  return (
    <S.List>
      {records.length > 0 &&
        records.map((record, index) => (
          <ListCard
            key={index}
            record={record}
            onEllipsisClicked={() => handleOptionModal(record, true)}
          />
        ))}
    </S.List>
  );
};

export default AnggaranList;
