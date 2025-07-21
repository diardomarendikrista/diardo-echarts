import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export default function MapSection({ title, onTitleClick }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    fetch("/indonesia.json")
      .then((res) => res.json())
      .then((geoJson) => {
        echarts.registerMap("indonesia", geoJson);
        setMapLoaded(true);
      });
  }, []);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}",
    },
    geo: {
      map: "indonesia",
      roam: true,
      label: {
        show: true,
        color: "#555",
      },
      itemStyle: {
        areaColor: "#e0f3ff",
        borderColor: "#444",
      },
      emphasis: {
        itemStyle: {
          areaColor: "#a0cfff",
        },
      },
    },
    series: [
      {
        name: "Location",
        type: "scatter",
        coordinateSystem: "geo",
        data: [
          {
            name: "DKI Jakarta",
            value: [106.8, -6.2],
          },
        ],
        symbolSize: 12,
        label: {
          show: true,
          formatter: "{b}",
          position: "right",
        },
        itemStyle: {
          color: "#ff5722",
        },
      },
    ],
  };

  return (
    <div>
      <div
        onClick={onTitleClick}
        className={`top-0 left-0 z-10 bg-white px-2 py-1 text-lg font-bold text-gray-800 ${
          onTitleClick ? "cursor-pointer hover:text-red-800" : ""
        }`}
      >
        {title}
      </div>

      {mapLoaded ? (
        <ReactECharts
          option={option}
          style={{ height: "450px", width: "100%" }}
        />
      ) : (
        <div className="text-gray-500 text-center py-20">
          Memuat peta Indonesia...
        </div>
      )}
    </div>
  );
}
