import ReactECharts from "echarts-for-react";

export default function GroupedBarChart({ title, onTitleClick, data }) {
  const getChartOptions = () => ({
    title: { text: title, left: "left", textStyle: { color: "transparent" } },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: data.series.map((s) => s.name), // Legenda dinamis
    },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: data.categories,
      axisLabel: { interval: 0, rotate: 30 },
    },
    yAxis: { type: "value", name: "Total Participants" },
    // Series dibuat secara dinamis dari data
    series: data.series.map((s) => ({
      name: s.name,
      type: "bar",
      barGap: 0, // Tidak ada jarak antar bar dalam satu grup
      emphasis: { focus: "series" },
      data: s.data,
      itemStyle: { color: s.color },
    })),
  });

  return (
    <div className="h-full">
      <div
        onClick={() => onTitleClick && onTitleClick(title)}
        className={`text-lg font-bold text-gray-800 mb-4 ${onTitleClick ? "cursor-pointer" : ""}`}
      >
        {title}
      </div>
      <ReactECharts
        option={getChartOptions()}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
}
