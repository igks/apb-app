import { EllipsisIcon, RemainIcon, WalletIcon } from "components/shared/Icons";
import { useEffect, useState } from "react";
import { Colors } from "../../../constants";
import { currencyFormat } from "../../../helpers/currency-format";
import * as S from "./styled.component";

const ListCard = ({ record, onEllipsisClicked }) => {
  const [used, setUsed] = useState(0);

  useEffect(() => {
    if (record?.details?.length > 0 ?? false) {
      let newUsedValue = 0;
      record.details.forEach((item) => {
        newUsedValue += item.value;
      });
      setUsed(newUsedValue);
    }
    // eslint-disable-next-line
  }, []);

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
          <RemainIcon /> {currencyFormat(parseInt(record.value - used))}
        </S.Content>
      </S.RowContent>
    </S.Card>
  );
};

export default ListCard;
