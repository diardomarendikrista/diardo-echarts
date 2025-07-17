import ReactECharts from "echarts-for-react";

export default function ReusableDonutChart({
  title,
  seriesData,
  colors,
  onTitleClick,
}) {
  // Menghitung total untuk ditampilkan di tengah
  const total = seriesData.reduce((sum, item) => sum + item.value, 0);

  const getChartOptions = () => ({
    title: {
      text: title,
      left: "left",
      textStyle: { color: "#333", fontWeight: "bold", fontSize: 16 },
    },
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: {
      orient: "vertical",
      left: "left",
      top: "middle",
      itemGap: 15,
      // Formatter untuk menampilkan nama dan persentase di legenda
      formatter: (name) => {
        const item = seriesData.find((p) => p.name === name);
        const percentage = ((item.value / total) * 100).toFixed(2);
        return `${name}   ${percentage}%`;
      },
    },
    color: colors,
    series: [
      {
        name: "Status",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["60%", "50%"], // Sesuaikan center chart dengan legend
        avoidLabelOverlap: false,
        label: { show: false }, // Menyembunyikan label di potongan chart
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

      {/* Custom HTML untuk total di tengah donat */}
      <div className="absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
        <div className="text-2xl font-bold text-gray-800">
          {total.toLocaleString("id-ID")}
        </div>
        <div className="text-sm text-gray-600 mt-1">TOTAL</div>
      </div>

      <ReactECharts
        option={getChartOptions()}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
}
