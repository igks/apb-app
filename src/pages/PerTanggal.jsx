import { GoBackIcon, RemainIcon } from "components/shared/Icons";
import { Colors, optionBulan } from "constants";
import { currencyFormat } from "helpers/currency-format";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDailyExpense } from "services/expense";

const PerTanggal = () => {
  const navigate = useNavigate();

  const [tanggal, setTanggal] = useState(null);
  const [details, setDetails] = useState([]);
  const [total, setTotal] = useState(0);

  const loadDetail = async () => {
    const date = new Date(tanggal);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const expenses = await getDailyExpense(day, optionBulan[month], year);
    let total = 0;
    const records = [];
    expenses.forEach((e) => {
      total += parseInt(e.value);
      records.push(e);
    });
    setDetails(records);
    setTotal(total);
  };

  useEffect(() => {
    loadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tanggal]);

  return (
    <div className="container">
      <div className="d-flex flex-grow align-items-center justify-content-between mb-3">
        <div className="">
          <div onClick={() => navigate("/")}>
            <GoBackIcon size="xl" color={Colors.grey} />
          </div>
        </div>
        <div className="m-0 p-1 alert alert-danger w-75 d-flex flex-column align-items-center justify-content-bottom">
          <p className="m-0 text-danger" style={{ fontSize: 14 }}>
            <RemainIcon /> {currencyFormat(total)}
          </p>
        </div>
      </div>

      <div className="row g-3 align-items-center justify-content-between mb-3">
        <div className="col-auto">
          <label className="col-form-label">Pilih tanggal</label>
        </div>
        <div className="col-8">
          <input
            type="date"
            id="date"
            className="form-control"
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <div style={{ height: "60vh", overflow: "auto" }}>
        {details.length > 0
          ? details.map((detail, index) => (
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
              </div>
            ))
          : tanggal != null && (
              <div className="alert alert-info">Tidak ada pengeluaran!!!</div>
            )}
      </div>
    </div>
  );
};

export default PerTanggal;
