import formatDate from "../../utils/dateFormatter.js";
import {chartThemes as CHART} from "../../themes/chart.themes.js";
import {tooltipStyle} from "../../utils/chart.tools.js";
import { Line } from "react-chartjs-2";

const QueryVolumeChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.count), 1);

  const chartData = {
    labels: data.map((d) => formatDate(d.date)),
    datasets: [
      {
        data: data.map((d) => d.count),
        borderColor: CHART.primary,
        borderWidth: 2,
        borderJoinStyle: "round",
        borderCapStyle: "round",
        tension: 0.35,
        fill: true,
        pointBackgroundColor: CHART.surface,
        pointBorderColor: CHART.primary,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: CHART.surface,
        pointHoverBorderColor: CHART.primary,
        backgroundColor: (ctx) => {
          const { ctx: c, chartArea } = ctx.chart;
          if (!chartArea) return "transparent";
          const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          g.addColorStop(0, "rgba(227, 24, 55, 0.35)");
          g.addColorStop(1, "rgba(227, 24, 55, 0)");
          return g;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: "easeOutQuart" },
    layout: { padding: { top: 12 } },
    plugins: {
      legend: { display: false },
      tooltip: tooltipStyle,
    },
    scales: {
      x: {
        grid: { color: CHART.border, drawTicks: false },
        border: { display: false },
        ticks: { color: CHART.muted, font: { size: 11 }, padding: 8 },
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.ceil(max * 1.2),
        grid: { color: CHART.border, drawTicks: false },
        border: { display: false },
        ticks: {
          color: CHART.muted,
          font: { size: 11 },
          padding: 8,
          stepSize: 4,
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};
 export default QueryVolumeChart