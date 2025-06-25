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
      <div className='bg-[#f3f4f6] h-full'>
          
<div className="w-full max-w-6xl mx-auto h-[500px] py-20 p-6  rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold flex gap-1 justify-center items-center text-[#991b1b] mb-6"> <img className='h-[30px] w-[30px]' src="https://i.ibb.co/G4N5Kw39/icons8-graph-report-96.png" alt="img" /> ব্যয় রিপোর্ট চার্ট</h2>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#dc2626" name="টাকা (৳)" />
          <Bar dataKey="rice" fill="#f59e0b" name="খড়ি(কেজি)" />
        </BarChart>
      </ResponsiveContainer>
    </div>






    </div>
  );
};

export default ExpenseReport;
