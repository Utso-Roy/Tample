import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const Stats = () => {
  const data = [
    {
      name: 'মোট আয়',
      amount: 120000,
    },
    {
      name: 'মোট ব্যয়',
      amount: 75500,
    },
    {
      name: 'ব্যালেন্স',
      amount: 44500,
    },
  ];

  return (
    <div className='bg-[#f3f4f6] p-5 '>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h4 className="text-xl font-bold text-green-800">মোট আয়</h4>
          <p className="text-2xl font-semibold text-green-700">৳ ১,২০,০০০</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h4 className="text-xl font-bold text-red-800">মোট ব্যয়</h4>
          <p className="text-2xl font-semibold text-red-700">৳ ৭৫,৫০০</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h4 className="text-xl font-bold text-yellow-800">ব্যালেন্স</h4>
          <p className="text-2xl font-semibold text-yellow-700">৳ ৪৪,৫০০</p>
        </div>
      </div>

      {/* Recharts bar chart */}
      <div className="w-full h-[400px] bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold text-center text-green-800 mb-4">মোট হিসাব চার্ট</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#10b981" name="টাকা (৳)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
