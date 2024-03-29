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
import _ from "lodash";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import { loadAnggaranList } from "services/budget";

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
  const { state } = useLocation();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [compiledDetails, setCompiledDetails] = useState([]);
  const [keyReference, setSetKeyReference] = useState([]);
  const [used, setUsed] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormData] = useState({
    item: "",
    value: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [xLabels, setXLabels] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);
  const [bulan, setBulan] = useState("Pilih bulan");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `GRAFIK HARIAN ${bulan.toLocaleUpperCase()}`,
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
    const rawRecord = await loadAnggaranList(bulan);
    const details = [];
    rawRecord.forEach((record) => {
      details.push(...record.details);
    });
    const objectDetails = _.groupBy(details, (detail) => {
      return detail.tanggal;
    });
    const label = [];
    const data = [];
    Object.keys(objectDetails).forEach((key) => {
      label.push(key);
      let sum = objectDetails[key].reduce(
        (acc, detail) => acc + detail.value,
        0
      );
      data.push(sum);
    });
    setXLabels(label);
    setDataSeries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [bulan]);

  return (
    <div className="container">
      <SelectMonth onSetMonth={setBulan} />
      <hr className="mb-4" />
      {bulan != "Pilih bulan" ? (
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
