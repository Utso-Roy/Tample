import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const ExpenseReport = () => {
  const [prosadTk, setProsadTk] = useState([]);
  const [khoriTk, setKhoriTk] = useState([]);
  const [othersTk, setOthersTk] = useState([]);
  const [decorationTk, setDecorationTk] = useState([]);
  const [pujaTk, setPujaTk] = useState([]);
  const [currentTk, setCurrentTk] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/totalParosadBills')
      .then(res => res.json())
      .then(data => setProsadTk(data));

    fetch('http://localhost:3000/totalKhoriBills')
      .then(res => res.json())
      .then(data => setKhoriTk(data));

    fetch('http://localhost:3000/totalOtherBills')
      .then(res => res.json())
      .then(data => setOthersTk(data));

    fetch('http://localhost:3000/totalDecorationBills')!
      .then(res => res.json())
      .then(data => setDecorationTk(data));

    fetch('http://localhost:3000/totalCurrentsBills')
      .then(res => res.json())
      .then(data => setCurrentTk(data));

    fetch('http://localhost:3000/totalPujaExpense')
      .then(res => res.json())
      .then(data => setPujaTk(data));
  }, []);

  const totalProsadTk = prosadTk[0]?.totalTk || 0;
  const totalKhoriTk = khoriTk[0]?.totalTk || 0;
  const totalOthersTk = othersTk[0]?.totalTk || 0;
  const totalDecorationTk = decorationTk[0]?.totalTk || 0;
  const totalCurrentTk = currentTk[0]?.totalTk || 0;
  const totalPujaTk = pujaTk[0]?.totalTk || 0;

  const data = [
    { name: 'পূজার খরচ', amount: totalPujaTk },
    { name: 'প্রসাদের খরচ', amount: totalProsadTk },
    { name: 'বিদ্যুৎ বিল', amount: totalCurrentTk },
    { name: 'বাহিরের খরচ', amount: totalOthersTk },
    { name: 'ডেকোরেশন খরচ', amount: totalDecorationTk },
    { name: 'খড়ি বাবদ খরচ', amount: totalKhoriTk },
  ];

  const barColors = [
    '#DC2626', // red-600
    '#EA580C', // orange-600
    '#CA8A04', // yellow-600
    '#16A34A', // green-600
    '#2563EB', // blue-600
    '#7C3AED', // violet-600
  ];

  return (
    <div className='h-full bg-[#f3f4f6] dark:bg-[#1E2939] py-16 px-4'>
      <div className="max-w-6xl mx-auto bg-white dark:bg-[#334155] rounded-xl shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold flex gap-2 justify-center items-center mb-6 text-[#991b1b] dark:text-red-400">
          <img className='h-8 w-8' src="https://i.ibb.co/G4N5Kw39/icons8-graph-report-96.png" alt="img" />
          ব্যয় রিপোর্ট চার্ট
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            barGap={10}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#334155" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#334155" }} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "5px" }} />
            <Legend />
            <Bar dataKey="amount" name="ব্যয় (৳)" barSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseReport;
