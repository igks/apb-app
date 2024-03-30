import { EllipsisIcon, RemainIcon, WalletIcon } from "components/shared/Icons";
import { Colors } from "../../../constants";
import { currencyFormat } from "../../../helpers/currency-format";
import * as S from "./styled.component";

const ListCard = ({ record, onEllipsisClicked }) => {
  return (
    <S.Card>
      <S.RowHeader>
        <S.Item>{record.name}</S.Item>
        <EllipsisIcon
          color={Colors.grey}
          size="lg"
          onClick={() => onEllipsisClicked(record, true)}
        />
      </S.RowHeader>
      <S.RowContent>
        <S.Content color="#1b5e20">
          <WalletIcon /> {currencyFormat(parseInt(record.value))}
        </S.Content>
        <S.Content color="#b71c1c">
          <RemainIcon />{" "}
          {currencyFormat(parseInt(record.value) - parseInt(record.expense))}
        </S.Content>
      </S.RowContent>
    </S.Card>
  );
};

export default ListCard;
