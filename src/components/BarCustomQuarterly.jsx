import React from "react";
import ReactECharts from "echarts-for-react";

// custom nya lumayan rumit (warna bar beda, dan legend juga beda), jadi sementara jangan reusable dulu
export default function BarCustomQuarterly({ title, onTitleClick, data }) {
  const getChartOptions = () => ({
    title: { text: title, left: "left", textStyle: { color: "transparent" } },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },

    legend: data.legend,

    grid: { left: "3%", right: "4%", bottom: "10%", containLabel: true },
    xAxis: {
      type: "category",
      data: data.categories,
    },
    yAxis: { type: "value", max: 5 },

    series: [
      {
        type: "bar",
        data: data.values,
        barGap: "0%",
        barWidth: "60%",
        showBackground: true,
      },
      ...data.legend.data.map((item) => ({
        name: item.name,
        type: "bar",
        data: [],
      })),
    ],
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
