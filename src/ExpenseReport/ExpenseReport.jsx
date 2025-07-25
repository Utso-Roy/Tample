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
import Loading from "../Loader/Loading";

const ExpenseReport = () => {
  const [loading, setLoading] = useState(true);
  const [prosadTk, setProsadTk] = useState([]);
  const [khoriTk, setKhoriTk] = useState([]);
  const [othersTk, setOthersTk] = useState([]);
  const [decorationTk, setDecorationTk] = useState([]);
  const [pujaTk, setPujaTk] = useState([]);
  const [currentTk, setCurrentTk] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          fetch("https://tample-server.vercel.app/totalParosadBills").then(
            (res) => res.json()
          ),
          fetch("https://tample-server.vercel.app/totalKhoriBills").then(
            (res) => res.json()
          ),
          fetch("https://tample-server.vercel.app/totalOtherBills").then(
            (res) => res.json()
          ),
          fetch("https://tample-server.vercel.app/totalDecorationBills").then(
            (res) => res.json()
          ),
          fetch("https://tample-server.vercel.app/totalCurrentsBills").then(
            (res) => res.json()
          ),
          fetch("https://tample-server.vercel.app/totalPujaExpense").then(
            (res) => res.json()
          ),
        ];

        const [
          prosadData,
          khoriData,
          othersData,
          decorationData,
          currentData,
          pujaData,
        ] = await Promise.all(urls);

        setProsadTk(prosadData);
        setKhoriTk(khoriData);
        setOthersTk(othersData);
        setDecorationTk(decorationData);
        setCurrentTk(currentData);
        setPujaTk(pujaData);
        setLoading(false);
      } catch (err) {
        console.error("Data Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProsadTk = prosadTk[0]?.totalTk || 0;
  const totalKhoriTk = khoriTk[0]?.totalTk || 0;
  const totalOthersTk = othersTk[0]?.totalTk || 0;
  const totalDecorationTk = decorationTk[0]?.totalTk || 0;
  const totalCurrentTk = currentTk[0]?.totalTk || 0;
  const totalPujaTk = pujaTk[0]?.totalTk || 0;

  const data = [
    { name: "পূজার খরচ", amount: totalPujaTk },
    { name: "প্রসাদের খরচ", amount: totalProsadTk },
    { name: "বিদ্যুৎ বিল", amount: totalCurrentTk },
    { name: "বাহিরের খরচ", amount: totalOthersTk },
    { name: "ডেকোরেশন খরচ", amount: totalDecorationTk },
    { name: "খড়ি বাবদ খরচ", amount: totalKhoriTk },
  ];

  const barColors = [
    "#DC2626",
    "#EA580C",
    "#CA8A04",
    "#16A34A",
    "#2563EB",
    "#7C3AED",
  ];

  return (
    <div className="h-full bg-[#f3f4f6] dark:bg-[#1E2939] py-16 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-[#334155] rounded-xl shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold flex gap-2 justify-center items-center mb-6 text-[#991b1b] dark:text-red-400">
          <img
            className="h-8 w-8"
            src="https://i.ibb.co/G4N5Kw39/icons8-graph-report-96.png"
            alt="img"
          />
          ব্যয় রিপোর্ট চার্ট
        </h2>

        {loading ? (
          <div>
            <Loading></Loading>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barGap={10}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                stroke="#94a3b8" // light gray-blue
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                stroke="#94a3b8"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f1f5f9",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#0f172a", fontWeight: "bold" }}
              />
              <Legend />
              <Bar dataKey="amount" name="ব্যয় (৳)" barSize={50}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseReport;
