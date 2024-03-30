import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import SelectMonth from "components/anggaran/SelectMonth";
import { GoBackIcon } from "components/shared/Icons";
import { Colors } from "constants";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { getMonthlyExpense } from "services/expense";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphHarian = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [xLabels, setXLabels] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);
  const [period, setPeriod] = useState({
    month: "",
    year: "",
  });
  const title =
    period.month === ""
      ? ""
      : `GRAFIK HARIAN ${period.month.toLocaleUpperCase()} - ${period.year}`;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels: xLabels,
    datasets: [
      {
        label: "Belanja Harian",
        data: dataSeries,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const loadData = async () => {
    setIsLoading(true);
    const expenses = await getMonthlyExpense(period.month, period.year);
    const details = [];
    expenses.forEach((e) => {
      details.push(e);
    });

    const objectDetails = _.groupBy(details, (detail) => {
      return detail.date;
    });
    const label = [];
    const data = [];
    Object.keys(objectDetails).forEach((key) => {
      label.push(key);
      let sum = objectDetails[key].reduce(
        (acc, detail) => acc + parseInt(detail.value),
        0
      );
      data.push(sum);
    });
    setXLabels(label);
    setDataSeries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (period.month === "") return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div onClick={() => navigate("/")}>
          <GoBackIcon size="xl" color={Colors.grey} />
        </div>
        <SelectMonth setPeriod={setPeriod} />
      </div>
      <hr className="mb-4" />
      {period.month !== "" ? (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Line options={options} data={data} />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GraphHarian;
