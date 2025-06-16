import React from "react";
import * as S from "../note/styled.component";

const KwitansiList = ({ period, onView }) => {
  return (
    <S.Card>
      <S.Title onClick={onView}>{period}</S.Title>
    </S.Card>
  );
};

export default KwitansiList;
