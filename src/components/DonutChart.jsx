import ReactECharts from "echarts-for-react";

export default function ReusableDonutChart({
  title,
  onTitleClick,
  seriesData,
  seriesCenter = ["50%", "50%"],
  colors,
  legendOptions,
  tooltip = {
    trigger: "item",
    formatter: function (params) {
      const value = params.value.toLocaleString("id-ID");
      const percent = params.percent;
      return `${params.name}: <b>${value}</b> (${percent}%)`;
    },
  },
  height = "400px",
}) {
  // Menghitung total untuk ditampilkan di tengah
  const total = seriesData.reduce((sum, item) => sum + item.value, 0);

  // Convert seriesCenter percentage to CSS values
  const getCenterPosition = () => {
    const x =
      typeof seriesCenter[0] === "string"
        ? seriesCenter[0]
        : `${seriesCenter[0]}%`;
    const y =
      typeof seriesCenter[1] === "string"
        ? seriesCenter[1]
        : `${seriesCenter[1]}%`;
    return { x, y };
  };

  const centerPos = getCenterPosition();

  const getChartOptions = () => ({
    title: {
      text: title,
      left: "left",
      textStyle: { color: "#333", fontWeight: "bold", fontSize: 16 },
    },
    tooltip: tooltip,
    legend: {
      bottom: 10,
      left: "center",
      formatter: (name) => {
        const item = seriesData.find((p) => p.name === name);
        const percentage = ((item.value / total) * 100).toFixed(2);
        return `${name}   ${percentage}%`;
      },
      ...legendOptions,
    },
    color: colors,
    series: [
      {
        name: "Status",
        type: "pie",
        radius: ["40%", "70%"],
        center: seriesCenter,
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: seriesData,
      },
    ],
  });

  return (
    <div className="relative h-full">
      <div
        onClick={onTitleClick}
        className={`absolute top-0 left-0 z-10 bg-white px-2 py-1 text-lg font-bold text-gray-800 transition-colors duration-200 ${
          onTitleClick ? "cursor-pointer hover:text-[#5D0D0D]" : ""
        }`}
      >
        {title}
      </div>

      {/* Dynamic positioned total in center that follows seriesCenter */}
      <div
        className="absolute z-10 pointer-events-none text-center"
        style={{
          left: centerPos.x,
          top: centerPos.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="text-2xl font-bold text-gray-800">
          {total.toLocaleString("id-ID")}
        </div>
        <div className="text-sm text-gray-600 mt-1">TOTAL</div>
      </div>

      <ReactECharts
        option={getChartOptions()}
        style={{ height: height, width: "100%" }}
      />
    </div>
  );
}
