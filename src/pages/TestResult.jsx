import ReusableDonutChart from "components/DonutChart";
import GroupedBarChart from "components/GroupedBarChart";
import Layout from "components/Layout";
import { useEffect, useState } from "react";

export default function TestResult() {
  const [competencyData, setCompetencyData] = useState(null);
  const [hardSkillData, setHardSkillData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const competencyColors = {
    pass: "#89B57D",
    fail: "#C75D5D",
  };

  const handleTitleClick = (chartTitle) => {
    alert(`Judul yang diklik adalah: "${chartTitle}"`);
  };

  useEffect(() => {
    // Simulasi fetch data dari satu API
    setTimeout(() => {
      const rawData = [
        { name: "Account Management", pass: 20271, fail: 7095 },
        { name: "Business Advisory", pass: 13305, fail: 0 },
        { name: "Business Environment Analysis", pass: 0, fail: 12434 },
        { name: "Business Opportunity Development", pass: 15809, fail: 0 },
        { name: "Credit Assessment", pass: 18544, fail: 8822 },
        { name: "Customer Acquisition Management", pass: 10533, fail: 0 },
        { name: "Customer Relationship Management", pass: 17652, fail: 9714 },
        { name: "Financial Literacy Desimination", pass: 15429, fail: 0 },
        { name: "Product Advisory", pass: 20016, fail: 7350 },
      ];

      // Data untuk GroupedBarChart
      const competencyChartData = {
        categories: rawData.map((item) => item.name),
        series: [
          {
            name: "Fail",
            data: rawData.map((item) => item.fail),
            color: competencyColors.fail,
          },
          {
            name: "Pass",
            data: rawData.map((item) => item.pass),
            color: competencyColors.pass,
          },
        ],
      };
      setCompetencyData(competencyChartData);

      // Data untuk DonutChart
      const totalPass = rawData.reduce((sum, item) => sum + item.pass, 0);
      const totalFail = rawData.reduce((sum, item) => sum + item.fail, 0);
      const hardSkillChartData = [
        { name: "Pass", value: totalPass },
        { name: "Fail", value: totalFail },
      ];
      setHardSkillData(hardSkillChartData);

      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="bg-gray-200 min-h-screen p-4 sm:p-8 font-sans">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Hard Skill Competency
        </h1>

        {isLoading ? (
          <div className="text-center p-10">Loading charts...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Kiri mengambil 2/3 bagian */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
              <GroupedBarChart
                title="Hard Skill Competencies Result"
                onTitleClick={handleTitleClick}
                data={competencyData}
              />
            </div>
            {/* Chart Kanan mengambil 1/3 bagian */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <ReusableDonutChart
                title="Hard Skill Summary Result"
                onTitleClick={handleTitleClick}
                seriesData={hardSkillData}
                colors={[competencyColors.fail, competencyColors.pass]}
                seriesCenter={["50%", "50%"]}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
