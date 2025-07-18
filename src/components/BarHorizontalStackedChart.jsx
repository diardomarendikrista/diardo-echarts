import React from "react";
import ReactECharts from "echarts-for-react";

export default function BarHorizontalStackedChart({
  title,
  onTitleClick,
  data,
}) {
  const getChartOptions = () => ({
    title: { text: title, left: "left", textStyle: { color: "transparent" } },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "value",
      max: 100,
      splitLine: { show: true, lineStyle: { type: "dashed" } },
    },
    yAxis: {
      type: "category",
      data: data.categories, // Sumbu Y dinamis
      axisTick: { show: false },
      axisLine: { show: false },
    },
    // Series dinamis menggunakan .map()
    series: data.series.map((s) => ({
      name: s.name,
      type: "bar",
      stack: "total", // Semua series akan ditumpuk dalam 'total'
      label: s.showLabel
        ? { show: true, position: "right", formatter: "{c}%", color: "#555" }
        : { show: false },
      itemStyle: { color: s.color },
      data: s.data,
      silent: s.silent || false, // Membuat bar background tidak interaktif
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
        style={{ height: "350px", width: "100%" }}
      />
    </div>
  );
}
