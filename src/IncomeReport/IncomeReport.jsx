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
  {
    name: 'উত্তর পাড়া', amount: 20000,
  },
  {
    name: 'মাঝ পাড়া', amount: 15000,
  },
  {
    name: 'দক্ষিণ পাড়া', amount: 10000,
  },
  {
    name: 'বাইরের কালেকশন', amount: 300000,
  },
  {
    name: 'চাল কালেকশন', amount: 0, rice: 7000,
  },
];

const IncomeReportChart = () => {
  return (
    <div className="w-full h-[500px] my-16 px-4 py-6 bg-white dark:bg-[#1E2939] dark:border dark:border-gray-600 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400 mb-6 flex justify-center items-center gap-2">
        <img className="h-[30px] w-[30px]" src="https://i.ibb.co/G4N5Kw39/icons8-graph-report-96.png" alt="Report" />
        ইনকাম রিপোর্ট চার্ট
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="name" stroke="#8884d8" tick={{ fill: 'gray' }} />
          <YAxis tick={{ fill: 'gray' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '6px' }}
            labelStyle={{ color: '#374151' }}
          />
          <Legend wrapperStyle={{ color: '#374151' }} />
          <Bar dataKey="amount" fill="#16a34a" name="টাকা (৳)" />
          <Bar dataKey="rice" fill="#facc15" name="চাল (কেজি)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeReportChart;
