import Layout from "components/Layout";
import BarCustomQuarterly from "components/BarCustomQuarterly";
import BarHorizontalStackedChart from "components/BarHorizontalStackedChart";
import { useEffect, useState } from "react";
import LoadingSpinner from "components/LoadingSpinner";
import { rawPerformanceData, rawRatingData } from "hardcodeData/otherpage";

export default function OtherPage() {
  const [performanceData, setPerformanceData] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const themeColors = {
    q1: "#A8D5BA",
    q2: "#5EAAA8",
    q3: "#D095BF",
    q4: "#E8A07D",
    q1Background: "#F5F8F2",
    q2Background: "#EBF1F6",
    q3Background: "#F8EEF7",
    q4Background: "#FBF4EE",
    gradientOrange: {
      type: "linear",
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        { offset: 0, color: "#FAD961" },
        { offset: 1, color: "#F76B1C" },
      ],
    },
    percentageBackground: {
      type: "linear",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: "#FFEFE2" },
        { offset: 1, color: "#FEFCE3" },
      ],
    },
  };

  const handleTitleClick = (chartTitle) => {
    alert(`Judul yang diklik adalah: "${chartTitle}"`);
  };

  useEffect(() => {
    // Simulasi fetch data
    setTimeout(() => {
      // Jahit data untuk chart
      const performanceChartData = {
        categories: rawPerformanceData.months,
        legend: {
          bottom: 0,
          data: [
            { name: "Q1", itemStyle: { color: themeColors.q1 } },
            { name: "Q2", itemStyle: { color: themeColors.q2 } },
            { name: "Q3", itemStyle: { color: themeColors.q3 } },
            { name: "Q4", itemStyle: { color: themeColors.q4 } },
          ],
        },
        values: [
          ...rawPerformanceData.q1.map((value) => ({
            value,
            itemStyle: { color: themeColors.q1 },
          })),
          ...rawPerformanceData.q2.map((value) => ({
            value,
            itemStyle: { color: themeColors.q2 },
          })),
          ...rawPerformanceData.q3.map((value) => ({
            value,
            itemStyle: { color: themeColors.q3 },
          })),
          ...rawPerformanceData.q4.map((value) => ({
            value,
            itemStyle: { color: themeColors.q4 },
          })),
        ],
      };
      setPerformanceData(performanceChartData);

      const ratingChartData = {
        categories: rawRatingData.map((item) => item.name),
        series: [
          {
            name: "Value",
            data: rawRatingData.map((item) => item.value),
            color: themeColors.gradientOrange,
            showLabel: true,
          },
          {
            name: "Background",
            data: rawRatingData.map((item) => 100 - item.value),
            color: themeColors.percentageBackground,
            silent: true,
          },
        ],
      };
      setRatingData(ratingChartData);

      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="space-y-3 py-5 px-9 bg-[#F9FBFC] border-1 h-[760px] overflow-y-scroll">
        <h2 className="text-2xl font-bold text-gray-700 mb-1">
          Employee Lifetime Value & Performance Management
        </h2>

        {isLoading ? (
          <LoadingSpinner text="Memuat data dasbor, mohon tunggu..." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <BarCustomQuarterly
                title="Performance-Appraisal-Participation-Rate"
                onTitleClick={handleTitleClick}
                data={performanceData}
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <BarHorizontalStackedChart
                title="Performance-Rating-Percent-Of-Total-Distribution"
                onTitleClick={handleTitleClick}
                data={ratingData}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
