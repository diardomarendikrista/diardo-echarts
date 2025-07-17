import ReactECharts from "echarts-for-react";

export default function ReusableBarChart({
  title,
  xAxisData,
  seriesData,
  onTitleClick,
}) {
  const getChartOptions = () => ({
    title: {
      text: title,
      left: "left",
      textStyle: { color: "#333", fontWeight: "bold", fontSize: 16 },
    },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: {
      top: 75, // 'top' memberi ruang untuk area judul
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      name: "Education Degree",
      nameLocation: "middle",
      nameGap: 80,
      axisLabel: { interval: 0, rotate: 30 }, // Rotasi label agar tidak tumpang tindih
    },
    yAxis: {
      type: "value",
      name: "Total Participant",
      nameLocation: "middle",
      nameGap: 50,
    },
    series: [
      {
        name: "Total Participant",
        type: "bar",
        data: seriesData,
        barWidth: "50%",
        label: {
          show: true,
          position: "top",
          formatter: (params) => params.value.toLocaleString("id-ID"),
        },
        itemStyle: { color: "#54a0ff" },
      },
    ],
  });
  return (
    <div className="relative h-full">
      <div
        onClick={onTitleClick}
        className={`absolute top-0 left-0 z-10 bg-white px-2 py-1 text-lg font-bold text-gray-800 ${onTitleClick ? "cursor-pointer hover:text-red-800" : ""}`}
      >
        {title}
      </div>
      <ReactECharts
        option={getChartOptions()}
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
}
