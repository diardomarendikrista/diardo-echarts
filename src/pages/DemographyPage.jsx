import { useEffect, useState } from "react";
import LineChart from "components/LineChart";
import MapSection from "components/MapSection";
import { demographyData } from "./hardcodeData";
import DonutChart from "components/DonutChart";
import HorizontalBarChart from "components/BarHorizontalChart";
import LoadingSpinner from "components/LoadingSpinner";
import BarChart from "components/BarChart";
import Layout from "components/Layout";

export default function DemographyPage() {
  const [chartData, setChartData] = useState({
    age: null,
    tenure: null,
    jobPosition: null,
    employeeStatus: null,
    generation: null,
    gender: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [focus, setFocus] = useState("");

  useEffect(() => {
    // fungsi fetch nanti disini
    setIsLoading(true);
    setTimeout(() => {
      setChartData(demographyData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="space-y-3 py-5 px-9 bg-[#F9FBFC] border-1 h-[760px] overflow-y-scroll">
        <div className="flex gap-2 items-center">
          {focus && (
            <svg
              className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setFocus("")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          )}
          <h2 className="text-2xl font-bold text-gray-700 mb-1">
            {focus || "Demography"}
          </h2>
        </div>

        {isLoading ? (
          <LoadingSpinner text="Memuat data dasbor, mohon tunggu..." />
        ) : (
          <div>
            {(focus === "Work Office Area" || !focus) && (
              <div>
                <MapSection
                  key={focus} // kalo ga mau ada efek re-render, hapus ini
                  title={focus ? "" : "Work Office Area"}
                  onTitleClick={() => setFocus("Work Office Area")}
                />
              </div>
            )}
            <div
              className={`grid grid-cols-1 gap-3 ${focus ? "lg:grid-cols-1" : "lg:grid-cols-2"}`}
            >
              {(focus === "Age Distribution" || !focus) && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <LineChart
                    key={focus} // kalo ga mau ada efek re-render, hapus ini
                    title={focus ? "" : "Age Distribution"}
                    xAxisName="Age Distribution"
                    yAxisName="Total Participant"
                    xAxisData={chartData.age.xAxis}
                    seriesData={chartData.age.series}
                    seriesName="Total Participant"
                    areaColor="128, 180, 232"
                    lineColor="128, 180, 232"
                    onTitleClick={() => setFocus("Age Distribution")}
                  />
                </div>
              )}
              {(focus === "Tenure Distribution (in years)" || !focus) && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <LineChart
                    key={focus} // kalo ga mau ada efek re-render, hapus ini
                    title={focus ? "" : "Tenure Distribution (in years)"}
                    xAxisName="Tenure (in years)"
                    yAxisName="Total Participants"
                    xAxisData={chartData.tenure.xAxis}
                    seriesData={chartData.tenure.series}
                    seriesName="Total Participants"
                    areaColor="59, 162, 114"
                    lineColor="59, 162, 114"
                    onTitleClick={() =>
                      setFocus("Tenure Distribution (in years)")
                    }
                  />
                </div>
              )}
              {(focus === "Job Positions" || !focus) && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <HorizontalBarChart
                    key={focus}
                    title={focus ? "" : "Job Positions"}
                    yAxisData={chartData.jobPosition.yAxis}
                    seriesData={chartData.jobPosition.series}
                    onTitleClick={() => setFocus("Job Positions")}
                  />
                </div>
              )}
              {(focus === "Employee Status" || !focus) && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <DonutChart
                    key={focus}
                    title={focus ? "" : "Employee Status"}
                    seriesData={chartData.employeeStatus.series}
                    colors={chartData.employeeStatus.colors}
                    onTitleClick={() => setFocus("Employee Status")}
                  />
                </div>
              )}
              {(focus === "Generation Type" || !focus) && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <DonutChart
                    key={focus}
                    title="Generation Type"
                    seriesData={chartData.generation.series}
                    colors={chartData.generation.colors}
                    onTitleClick={() => setFocus("Generation Type")}
                    seriesCenter={["60%", "50%"]}
                    legendOptions={{
                      orient: "vertical",
                      left: "left",
                      top: "middle",
                      itemGap: 15,
                    }}
                  />
                </div>
              )}
              {(focus === "Gender" || !focus) && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <DonutChart
                    key={focus}
                    title={focus ? "" : "Gender"}
                    seriesData={chartData.gender.series}
                    colors={chartData.gender.colors}
                    onTitleClick={() => setFocus("Gender")}
                    seriesCenter={["60%", "50%"]}
                    legendOptions={{
                      orient: "vertical",
                      left: "left",
                      top: "middle",
                      itemGap: 15,
                    }}
                  />
                </div>
              )}
            </div>

            {(focus === "Education Degree" || !focus) && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <BarChart
                  key={focus}
                  title={focus ? "" : "Education Degree"}
                  xAxisData={chartData.educationDegree.xAxis}
                  seriesData={chartData.educationDegree.series}
                  onTitleClick={() => setFocus("Education Degree")}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
