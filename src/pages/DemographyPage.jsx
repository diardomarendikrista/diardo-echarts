import { useEffect, useState } from "react";
import BarChart from "components/BarChart";
import BarHorizontalChart from "components/BarHorizontalChart";
import DonutChart from "components/DonutChart";
import Layout from "components/Layout";
import LineChart from "components/LineChart";
import LoadingSpinner from "components/LoadingSpinner";
import MapSection from "components/MapSection";
import { IoMdArrowBack } from "react-icons/io";
import { demographyData } from "hardcodeData/demography";

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
    setIsLoading(true);
    setTimeout(() => {
      // Jahit data dari API ke format chart (butuh xAxis dan series)
      const transformedData = {
        age: {
          xAxis: demographyData.age.map((item) => item.name),
          series: demographyData.age.map((item) => item.value),
        },
        tenure: {
          xAxis: demographyData.tenure.map((item) => item.name),
          series: demographyData.tenure.map((item) => item.value),
        },
        jobPosition: {
          yAxis: demographyData.jobPosition.map((item) => item.name),
          series: demographyData.jobPosition.map((item) => item.value),
        },
        educationDegree: {
          xAxis: demographyData.educationDegree.map((item) => item.name),
          series: demographyData.educationDegree.map((item) => item.value),
        },
        // Data Donut Chart tidak perlu diubah karena komponennya sudah menerima array of objects
        employeeStatus: demographyData.employeeStatus,
        generation: demographyData.generation,
        gender: demographyData.gender,
      };

      setChartData(transformedData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="space-y-3 py-5 px-9 bg-[#F9FBFC] border-1 h-[760px] overflow-y-scroll">
        <div className="flex gap-2 items-center">
          {focus && (
            <div
              className="text-gray-700 hover:text-black cursor-pointer text-2xl"
              onClick={() => setFocus("")}
            >
              <IoMdArrowBack />
            </div>
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
                    key={focus}
                    title={focus ? "" : "Age Distribution"}
                    onTitleClick={() => setFocus("Age Distribution")}
                    xAxisData={chartData.age.xAxis}
                    seriesData={chartData.age.series}
                    xAxisName="Age Distribution"
                    yAxisName="Total Participant"
                    seriesName="Total Participant"
                    areaColor="128, 180, 232"
                    lineColor="128, 180, 232"
                  />
                </div>
              )}
              {(focus === "Tenure Distribution (in years)" || !focus) && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <LineChart
                    key={focus}
                    title={focus ? "" : "Tenure Distribution (in years)"}
                    onTitleClick={() =>
                      setFocus("Tenure Distribution (in years)")
                    }
                    xAxisData={chartData.tenure.xAxis}
                    seriesData={chartData.tenure.series}
                    xAxisName="Tenure (in years)"
                    yAxisName="Total Participants"
                    seriesName="Total Participants"
                    areaColor="59, 162, 114"
                    lineColor="59, 162, 114"
                  />
                </div>
              )}
              {(focus === "Job Positions" || !focus) && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <BarHorizontalChart
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
