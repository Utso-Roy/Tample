import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
    <div className="bg-[#f3f4f6] dark:bg-[#1E2939] h-full p-6 rounded-xl transition-colors duration-300">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 dark:bg-green-900 p-5 rounded-lg shadow-lg text-center transition-colors">
          <h4 className="text-xl font-bold text-green-800 dark:text-green-300">মোট আয়</h4>
          <p className="text-3xl font-semibold text-green-700 dark:text-green-200">৳ ১,২০,০০০</p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 p-5 rounded-lg shadow-lg text-center transition-colors">
          <h4 className="text-xl font-bold text-red-800 dark:text-red-300">মোট ব্যয়</h4>
          <p className="text-3xl font-semibold text-red-700 dark:text-red-200">৳ ৭৫,৫০০</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-5 rounded-lg shadow-lg text-center transition-colors">
          <h4 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">ব্যালেন্স</h4>
          <p className="text-3xl font-semibold text-yellow-700 dark:text-yellow-200">৳ ৪৪,৫০০</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-[#334155] p-6 rounded-lg shadow-xl transition-colors">
        <h3 className="text-2xl font-bold text-center text-green-800 dark:text-green-300 mb-4">
          মোট হিসাব চার্ট
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                color: '#f1f5f9',
                border: 'none',
              }}
            />
            <Legend />
            <Bar dataKey="amount" fill="#10b981" name="টাকা (৳)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
