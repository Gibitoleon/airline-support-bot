import formatLabel from "../../utils/labelFormatter.js";
import { tooltipStyle } from "../../utils/chart.tools.js";
import { Doughnut} from "react-chartjs-2";

const DoughnutChart = ({ data, colorMap, labelKey, centerLabel }) => {
  const total = data.reduce((sum, d) => sum + d.count, 0) || 1;

  const chartData = {
    labels: data.map((d) => formatLabel(d[labelKey])),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: data.map((d) => colorMap[d[labelKey]]),
        borderWidth: 0,
        hoverOffset: 4,
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    animation: { duration: 800, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: tooltipStyle,
    },
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-48 w-48">
        <Doughnut data={chartData} options={options} />

        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-text">{total}</span>
          <span className="text-xs text-muted">{centerLabel}</span>
        </div>
      </div>

      <ul className="w-full space-y-2">
        {data.map((d) => (
          <li key={d[labelKey]} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: colorMap[d[labelKey]] }}
              />
              <span className="capitalize">{formatLabel(d[labelKey])}</span>
            </span>
            <span className="font-medium text-text">{d.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoughnutChart;