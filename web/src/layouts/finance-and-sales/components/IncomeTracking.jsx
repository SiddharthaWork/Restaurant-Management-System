import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, PointElement, Filler);

const IncomeTracking = () => {
  const data = {
    labels: ["Mon\n10", "Tue\n11", "Wed\n12", "Thu\n13", "Fri\n14", "Sat\n15"], // Days with stacked dates
    datasets: [
      {
        label: "Expenses",
        data: [5000, 4000, 4500, 4200, 4500, 4700],
        borderColor: "#00BFA6",
        backgroundColor: "rgba(0, 191, 166, 0.2)",
        borderWidth: 1,
        tension: 0.4,
        pointBackgroundColor: "transparent", // No points for the line
        pointBorderColor: "transparent",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#FFFFFF",
        titleColor: "#00BFA6",
        bodyColor: "#000000",
        displayColors: false,
        callbacks: {
          title: () => "",
          label: function (tooltipItem) {
            if (tooltipItem.dataIndex === 4) {
              return "4500: Low sales in May";
            }
            return `Expense: Rs.${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        position: "top",
        grid: {
          display: true,
        },
        ticks: {
          callback: function (value, index) {
            const labels = this.getLabelForValue(value).split("\n");
            return labels; // Split day and date into separate lines
          },
          color: "#707070",
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: false,
        borderColor: "transparent",
        min: 2500,
        max: 5000,
        beginAtZero: false,
        borderWidth: 0,
        ticks: {
            stepSize: 500, // Adjust the step size for the y-axis ticks
          },
      },
    },
    layout: {
      padding: {
        top: 20, 
        bottom: 10,
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 max-w-1/3 h-fit mx-auto shadow-md overflow-hidden sm:p-4 md:p-6 lg:p-8">
      <h3 className="text-lg font-medium text-black mb-3 sm:text-base md:text-lg lg:text-xl">
        Income Tracking
      </h3>
      <div className="w-full h-[500px]">
        <Line data={data} options={options} />
      </div>
      <div className="flex flex-col items-center justify-around  pt-3 sm:flex-row sm:space-x-4">
        <span className="text-sm font-bold text-black sm:text-xs md:text-sm px-6">
          Best
        </span>
        <span className="text-sm font-bold text-black sm:text-xs md:text-sm">
          Rs. 23000
        </span>
      </div>
      <div className="flex flex-col items-center justify-around mt-5 border-t border-gray-300 pt-3 sm:flex-row sm:space-x-4">
        <span className="text-sm font-bold text-black sm:text-xs md:text-sm">
          This Month
        </span>
        <span className="text-sm font-bold text-black sm:text-xs md:text-sm">
          Rs. 23000
        </span>
      </div>
    </div>
  );
};

export default IncomeTracking;
