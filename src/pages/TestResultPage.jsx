import DonutChart from "components/DonutChart";
import GroupedBarChart from "components/GroupedBarChart";
import Layout from "components/Layout";
import LoadingSpinner from "components/LoadingSpinner";
import { useEffect, useState } from "react";
import BarHorizontalChart from "components/BarHorizontalChart";
import { rawTestResultData } from "hardcodeData/testResult";

export default function TestResultPage() {
  const [testResultData, setTestResultData] = useState({
    hardSkill: [],
    rank: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [focus, setFocus] = useState("");

  const competencyColors = {
    pass: "#84BB4C",
    fail: "#ED6E6E",
  };

  const handleTitleClick = (chartTitle) => {
    alert(`Judul yang diklik adalah: "${chartTitle}"`);
  };

  useEffect(() => {
    // Simulasi fetch data dari satu API
    setTimeout(() => {
      // Jahit data untuk GroupedBarChart
      const competencyChartData = {
        categories: rawTestResultData.hardSkill.map((item) => item.name),
        series: [
          {
            name: "Fail",
            data: rawTestResultData.hardSkill.map((item) => item.fail),
            color: competencyColors.fail,
          },
          {
            name: "Pass",
            data: rawTestResultData.hardSkill.map((item) => item.pass),
            color: competencyColors.pass,
          },
        ],
      };
      // Jahit data untuk DonutChart
      const totalPass = rawTestResultData.hardSkill.reduce(
        (sum, item) => sum + item.pass,
        0
      );
      const totalFail = rawTestResultData.hardSkill.reduce(
        (sum, item) => sum + item.fail,
        0
      );
      const hardSkillChartData = [
        { name: "Pass", value: totalPass },
        { name: "Fail", value: totalFail },
      ];
      // Jahit data untuk bar horizontal
      const regionalChartData = {
        categories: rawTestResultData.regionalData.map((item) => item.name),
        series: rawTestResultData.regionalData.map((item) => item.value),
      };

      console.log(regionalChartData, "regionalChartData");

      setTestResultData({
        ...testResultData,
        competency: competencyChartData,
        hardSkill: hardSkillChartData,
        regional: regionalChartData,
        // rank: rawTestResultData.rank,
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="space-y-5 py-5 px-9 bg-[#F9FBFC] border-1 h-[760px] overflow-y-scroll">
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
            {focus || "Test Result"}
          </h2>
        </div>

        {isLoading ? (
          <LoadingSpinner text="Memuat data dasbor, mohon tunggu..." />
        ) : (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-700 mb-1">
              Hard Skill Competency
            </h2>
            {/* Hard Skill */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* Chart Kiri mengambil 2/3 bagian */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                <GroupedBarChart
                  title="Hard Skill Competencies Result"
                  onTitleClick={handleTitleClick}
                  data={testResultData.competency}
                />
              </div>
              {/* Chart Kanan mengambil 1/3 bagian */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <DonutChart
                  title="Hard Skill Summary Result"
                  onTitleClick={handleTitleClick}
                  seriesData={testResultData.hardSkill}
                  colors={[competencyColors.fail, competencyColors.pass]}
                  seriesCenter={["50%", "50%"]}
                  height="100%"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <BarHorizontalChart
                  title="Regional Office's % of 'Pass' Employees in Hard Skill Competency Result"
                  onTitleClick={handleTitleClick}
                  yAxisData={testResultData.regional.categories}
                  seriesData={testResultData.regional.series}
                  xAxisName={"Pass (%)"}
                  height="500px"
                  barColor="#689636"
                />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                {/* <RankTable
                  title="Rank Unit with % of Pass Employees (Hard Skill Comp)"
                  data={rankUnitData}
                /> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
