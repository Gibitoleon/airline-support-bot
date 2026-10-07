import {  Bar } from "react-chartjs-2";
import formatLabel from "../../utils/labelFormatter.js";
import { tooltipStyle } from "../../utils/chart.tools.js";
import {chartThemes as CHART} from "../../themes/chart.themes.js";

const DocumentDomainChart = ({ data }) => {
    console.log("Document domain data:", data);

  const chartData = {
    labels: data.map((d) => formatLabel(d.domain)),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: (ctx) => {
          const { ctx: c, chartArea } = ctx.chart;
          if (!chartArea) return CHART.primary;
          const g = c.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          g.addColorStop(0, "rgba(227, 24, 55, 0.55)");
          g.addColorStop(1, "rgba(227, 24, 55, 1)");
          return g;
        },
        borderRadius: 4,
        barThickness: 14,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false  },
      tooltip: tooltipStyle,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: CHART.border, drawTicks: false },
        border: { display: false },
        ticks: {
          color: CHART.muted,
          font: { size: 11 },
          precision: 0,
        },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: CHART.muted, font: { size: 11 } },
      },
    },
  };

  return (
    <div className="h-72 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};
export default DocumentDomainChart;