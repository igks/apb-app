import React from "react";
import * as S from "./styled.component";

const Note = ({ note, onDelete }) => {
  return (
    <S.Card>
      <S.Title>{note.title}</S.Title>
      <S.Content>{note.detail}</S.Content>
      <S.Button type="button" onClick={() => onDelete(note.id)}>
        Hapus
      </S.Button>
    </S.Card>
  );
};

export default Note;
