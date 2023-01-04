import React from "react";
import * as S from "./styled.component";

const Container = (props) => {
  const { header, content } = props;
  return (
    <S.Wrapper>
      <S.Body>
        {header && <S.Header>{header}</S.Header>}
        {content && <S.Content>{content}</S.Content>}
      </S.Body>
    </S.Wrapper>
  );
};

export default Container;
