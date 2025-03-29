import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#4caf50", "#f44336"],
        borderColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
