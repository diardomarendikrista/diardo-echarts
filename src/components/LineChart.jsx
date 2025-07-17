import ReactECharts from "echarts-for-react";

export default function ReusableLineChart({
  title,
  xAxisName,
  yAxisName,
  xAxisData,
  seriesData,
  seriesName,
  areaColor,
  lineColor,
  height = "400px",
  onTitleClick,
}) {
  const getChartOptions = () => ({
    title: {
      text: title,
      left: "left",
      textStyle: { color: "#333", fontWeight: "bold", fontSize: 16 },
    },
    grid: {
      top: 75, // 'top' memberi ruang untuk area judul
      left: "5%",
      right: "5%",
      bottom: "15%",
      containLabel: true,
    },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      name: xAxisName,
      nameLocation: "middle",
      nameGap: 35,
      boundaryGap: false,
      data: xAxisData,
      axisLine: { lineStyle: { color: "#ccc" } },
      axisLabel: { color: "#666" },
    },
    yAxis: {
      type: "value",
      name: yAxisName,
      nameLocation: "middle",
      nameGap: 50,
      axisLine: { show: true, lineStyle: { color: "#ccc" } },
      axisLabel: { color: "#666" },
      splitLine: { lineStyle: { type: "dashed", color: "#eee" } },
    },
    series: [
      {
        name: seriesName,
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        data: seriesData,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `rgba(${areaColor}, 0.5)` },
              { offset: 1, color: `rgba(${areaColor}, 0.1)` },
            ],
          },
        },
        lineStyle: { width: 3, color: `rgb(${lineColor})` },
        itemStyle: {
          color: `rgb(${lineColor})`,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: true, position: "top", color: "#333", formatter: "{c}" },
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
        style={{ height: height, width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}
