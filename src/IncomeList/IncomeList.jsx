import React from 'react';
import { Link } from 'react-router'; 

const IncomeList = () => {
  return (
    <div className="max-w-6xl mx-auto h-full bg-[#f3f4f6] dark:bg-[#1E2939] dark:border dark:border-white px-6 py-12 transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-[#166534] dark:text-green-400 flex items-center justify-center gap-3">
          <img className="w-10 h-10" src="https://i.ibb.co/SXSZ6bXc/salary.png" alt="Income" />
          ইনকাম তালিকা
        </h2>

      </div>

      {/* Income Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* উত্তর পাড়া */}
        <Link
          to="/uttarPara"
          className="bg-[#ecfdf5] dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 text-[#065f46] dark:text-green-100 p-6 rounded-xl shadow-lg border border-[#a7f3d0] dark:border-green-600 transition duration-300 transform hover:scale-[1.02]"
        >
          <h3 className="text-xl font-bold text-center mb-2">উত্তর পাড়া কালেকশন</h3>
        </Link>

        {/* মাঝা পাড়া */}
        <Link
          to="/MajaPara"
          className="bg-[#fef9c3] dark:bg-yellow-900 hover:bg-yellow-100 dark:hover:bg-yellow-800 text-[#92400e] dark:text-yellow-100 p-6 rounded-xl shadow-lg border border-[#fde68a] dark:border-yellow-600 transition duration-300 transform hover:scale-[1.02]"
        >
          <h3 className="text-xl font-bold text-center mb-2">মাঝা পাড়া কালেকশন</h3>
        </Link>

        {/* দক্ষিণ পাড়া */}
        <Link
          to="/dokkhinPara"
          className="bg-[#fdf2f8] dark:bg-pink-900 hover:bg-pink-100 dark:hover:bg-pink-800 text-[#9d174d] dark:text-pink-100 p-6 rounded-xl shadow-lg border border-[#fbcfe8] dark:border-pink-600 transition duration-300 transform hover:scale-[1.02]"
        >
          <h3 className="text-xl font-bold text-center mb-2">দক্ষিণ পাড়া কালেকশন</h3>
        </Link>

        {/* বাইরের কালেকশন */}
        <Link
          to="/outCollection"
          className="bg-[#fef2f2] dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 text-[#7f1d1d] dark:text-red-100 p-6 rounded-xl shadow-lg border border-[#fecaca] dark:border-red-600 transition duration-300 transform hover:scale-[1.02]"
        >
          <h3 className="text-xl font-bold text-center mb-2">বাইরের কালেকশন</h3>
        </Link>

        {/* চাল কালেকশন */}
        <Link
          to="/riceCollection"
          className="bg-[#f0fdf4] dark:bg-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-800 text-[#14532d] dark:text-emerald-100 p-6 rounded-xl shadow-lg border border-[#bbf7d0] dark:border-emerald-600 transition duration-300 transform hover:scale-[1.02]"
        >
          <h3 className="text-xl font-bold text-center mb-2">চাল কালেকশন</h3>
        </Link>
      </div>
    </div>
  );
};

export default IncomeList;
