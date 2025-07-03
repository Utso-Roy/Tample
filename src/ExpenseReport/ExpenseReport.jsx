import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'পূজার খরচ', amount: 20000, rice: 0 },
  { name: 'প্রসাদের খরচ', amount: 15000, rice: 0 },
  { name: 'বিদ্যুৎ বিল', amount: 10000, rice: 0 },
  { name: 'বাহিরের খরচ', amount: 30000, rice: 0 },
  { name: 'ডেকোরেশন খরচ', amount: 10000, rice: 0 },
  { name: 'খড়ি বাবদ খরচ', amount: 0, rice: 7000 },
];

const ExpenseReport = () => {
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
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#334155" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#334155" }} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "5px" }} />
            <Legend />
            <Bar dataKey="amount" fill="#dc2626" name="টাকা (৳)" />
            <Bar dataKey="rice" fill="#f59e0b" name="খড়ি (কেজি)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseReport;
