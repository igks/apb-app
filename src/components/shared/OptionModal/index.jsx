import React from "react";
import * as S from "./styled.component";
import { Colors } from "constants";
import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  ListIcon,
} from "components/shared/Icons";

const OptionModal = ({
  onClickCloseButton,
  onClickList,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <S.Container onClick={onClickCloseButton}>
      <S.Modal>
        <S.Header>
          <S.Title>Pilih Menu</S.Title>
          <CloseIcon
            color={Colors.red}
            size="xl"
            onClick={onClickCloseButton}
          />
        </S.Header>
        <S.Content>
          <ListIcon size="xl" className="text-info" onClick={onClickList} />
          <EditIcon size="xl" color={Colors.yellow} onClick={onClickEdit} />
          <DeleteIcon size="xl" color={Colors.red} onClick={onClickDelete} />
        </S.Content>
      </S.Modal>
    </S.Container>
  );
};

export default OptionModal;
