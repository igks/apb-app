import Calendar from "assets/image/calendar.jpg";
import Chart from "assets/image/chart.jpg";
import Coin from "assets/image/coin-rp.jpg";
import DewiLaksmi from "assets/image/dewi-laksmi.jpg";
import Receipt from "assets/image/receipt.jpg";
import Note from "assets/image/note.png";
import { Center, Space } from "components/shared/common";
import { useNavigate } from "react-router-dom";
import { MenuBox } from "./styled.component";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <>
      <Space h="5px" />
      <Center>
        <img src={DewiLaksmi} width={"70%"} alt="" className="rounded" />
      </Center>
      <Space h="20px" />
      <Center>
        <MenuBox onClick={() => navigate("/anggaran")}>
          <img
            src={Coin}
            width={100}
            height={50}
            alt=""
            className="rounded-circle"
          />
          <p>Budgeting</p>
        </MenuBox>
        <MenuBox onClick={() => navigate("/catatan")}>
          <img
            src={Note}
            width={50}
            height={50}
            alt=""
            className="rounded-circle"
          />
          <p>Notes</p>
        </MenuBox>
      </Center>
      <Center>
        <MenuBox onClick={() => navigate("/pertanggal")}>
          <img src={Calendar} width={100} alt="" className="rounded-circle" />
          <p>Expense by date</p>
        </MenuBox>
        <MenuBox onClick={() => navigate("/graph-harian")}>
          <img src={Chart} width={100} alt="" className="rounded-circle" />
          <p>Expense Trend</p>
        </MenuBox>
      </Center>
      <Center>
        <MenuBox onClick={() => navigate("/kwitansi")}>
          <img src={Receipt} width={100} alt="" className="rounded-circle" />
          <p>Kwitansi</p>
        </MenuBox>
      </Center>
    </>
  );
};

export default Menu;
