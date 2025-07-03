import React from 'react';

const AddExpenseList = () => {
  return (
    <div className="max-w-5xl mx-auto h-full px-4 py-10 bg-[#f3f4f6] dark:bg-[#1E2939] dark:border dark:border-white rounded-xl shadow">
      <h2 className="text-3xl font-bold flex gap-2 justify-center items-center mb-8 text-[#991b1b] dark:text-red-400">
        <img className='w-10 h-10' src="https://i.ibb.co/Q3K1Q4MC/spending.png" alt="Expense" />
        ব্যয় তালিকা
      </h2>

      <h2 className="text-2xl font-bold text-center mb-10 text-[#991b1b] dark:text-red-300">
        মোট ব্যয় : <span>৭৫,৫০০ টাকা</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Item */}
        {[
          { title: 'পূজার খরচ', bg: 'bg-[#fef2f2]', hover: 'hover:bg-red-100', text: 'text-[#7f1d1d]', border: 'border-[#fecaca]' },
          { title: 'বিদ্যুৎ বিল', bg: 'bg-[#f0f9ff]', hover: 'hover:bg-blue-100', text: 'text-[#1e40af]', border: 'border-[#bae6fd]' },
          { title: 'প্রসাদের খরচ', bg: 'bg-[#fdf4ff]', hover: 'hover:bg-purple-100', text: 'text-[#7e22ce]', border: 'border-[#f3e8ff]' },
          { title: 'বাহিরের খরচ', bg: 'bg-[#fefce8]', hover: 'hover:bg-yellow-100', text: 'text-[#854d0e]', border: 'border-[#fef08a]' },
          { title: 'ডেকোরেশন খরচ', bg: 'bg-[#f0fdf4]', hover: 'hover:bg-green-100', text: 'text-[#14532d]', border: 'border-[#bbf7d0]' },
          { title: 'খড়ি বাবদ খরচ', bg: 'bg-[#f0f9ff]', hover: 'hover:bg-blue-100', text: 'text-[#1e40af]', border: 'border-[#bae6fd]' },
        ].map((item, index) => (
          <button
            key={index}
            className={`w-full p-6 rounded-lg shadow-md border ${item.bg} ${item.hover} ${item.border} dark:bg-[#334155] dark:border-white dark:hover:bg-[#475569] transition duration-300`}
          >
            <h3 className={`text-xl font-semibold text-center ${item.text} dark:text-white mb-2`}>
              {item.title}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddExpenseList;
