import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const IncomeReportChart = () => {
  const [uttarParatk, setUttarParaTk] = useState([]);
  const [dokhinParatk, setDokhinParaTk] = useState([]);
  const [majhaParatk, setMajhaParaTk] = useState([]);
  const [outCollectiontk, setOutCollectionTk] = useState([]);

  // Data fetching
  useEffect(() => {
    fetch("https://tample-server.vercel.app/uttarPara/totalTk")
      .then((res) => res.json())
      .then((data) => setUttarParaTk(data));
  }, []);

  useEffect(() => {
    fetch("https://tample-server.vercel.app/dokkhinParaTotalTk")
      .then((res) => res.json())
      .then((data) => setDokhinParaTk(data));
  }, []);

  useEffect(() => {
    fetch("https://tample-server.vercel.app/majhaParaTotalTk")
      .then((res) => res.json())
      .then((data) => setMajhaParaTk(data));
  }, []);

  useEffect(() => {
    fetch("https://tample-server.vercel.app/outCollectionTk")
      .then((res) => res.json())
      .then((data) => setOutCollectionTk(data));
  }, []);

  // Extracted values
  const totalTkUttarPara = uttarParatk[0]?.totalTk || 0;
  const totalTkDokkhinPara = dokhinParatk[0]?.totalTk || 0;
  const totalTkMajhaPara = majhaParatk[0]?.totalTk || 0;
  const totalTkOutCollection = outCollectiontk[0]?.totalTk || 0;

  const data = [
    { name: "উত্তর পাড়া", amount: totalTkUttarPara },
    { name: "মাঝ পাড়া", amount: totalTkMajhaPara },
    { name: "দক্ষিণ পাড়া", amount: totalTkDokkhinPara },
    { name: "বাইরের কালেকশন", amount: totalTkOutCollection },
  ];

  const barColors = [
    "#F97316", // orange-500
    "#8B5CF6", // violet-500
    "#22C55E", // green-500
    "#3B82F6", // blue-500
  ];

  return (
    <div className="max-w-3xl h-[500px] mx-auto my-12 px-6 py-6 bg-base-200 dark:bg-[#1f2937] rounded-2xl shadow-lg dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-3xl font-semibold text-center mb-8 flex items-center justify-center gap-3 text-[#8B5CF6]">
        <img
          src="https://i.ibb.co/G4N5Kw39/icons8-graph-report-96.png"
          alt="Report Icon"
          className="w-8 h-8"
        />
        ইনকাম রিপোর্ট চার্ট
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 30 }}
          barGap={10}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            tick={{ fill: "#64748b", fontSize: 13 }}
          />
          <YAxis tick={{ fill: "#64748b", fontSize: 13 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
            labelStyle={{ color: "#1e293b" }}
          />
          <Legend wrapperStyle={{ color: "#334155" }} />

          <Bar dataKey="amount" name="টাকা (৳)" barSize={60}>
            {data.map((entry, index) => (
              <Cell
                key={`amount-${index}`}
                fill={barColors[index % barColors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeReportChart;
