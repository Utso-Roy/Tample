import React from 'react';

const AddExpenseList = () => {
    return (
        
           <div className="max-w-5xl mx-auto h-full px-4 py-10 bg-[#f3f4f6]">
  <h2 className="text-3xl font-bold flex gap-2 justify-center items-center mb-8 text-[#991b1b]">
    <img className='w-10 h-10' src="https://i.ibb.co/Q3K1Q4MC/spending.png" alt="Expense" />
     ব্যয় তালিকা
  </h2>
  <h2 className="text-3xl font-bold text-center mb-8 text-[#991b1b]">
    মোট ব্যয় : <span>৭৫,৫০০ টাকা</span>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <button  className="w-full text-left bg-[#fef2f2] cursor-pointer p-6 hover:bg-red-100 rounded-lg shadow-md border border-[#fecaca]">
      <h3 className="text-xl font-semibold text-center text-[#7f1d1d] mb-4">পূজার খরচ</h3>
    </button>

    <button  className="w-full text-left bg-[#f0f9ff] cursor-pointer p-6 rounded-lg hover:bg-blue-100 shadow-md border border-[#bae6fd]">
      <h3 className="text-xl font-semibold text-center text-[#1e40af] mb-4">বিদ্যুৎ বিল</h3>
    </button>

    <button  className="w-full text-left bg-[#fdf4ff] cursor-pointer p-6 hover:bg-purple-100 rounded-lg shadow-md border border-[#f3e8ff]">
      <h3 className="text-xl font-semibold text-center text-[#7e22ce] mb-4">প্রসাদের খরচ</h3>
    </button>

    <button  className="w-full text-left bg-[#fefce8] cursor-pointer p-6 hover:bg-yellow-100 rounded-lg shadow-md border border-[#fef08a]">
      <h3 className="text-xl font-semibold text-center text-[#854d0e] mb-4">বাহিরের খরচ</h3>
    </button>

    <button  className="w-full text-left bg-[#f0fdf4] hover:bg-green-100 cursor-pointer p-6 rounded-lg shadow-md border border-[#bbf7d0]">
      <h3 className="text-xl font-semibold text-center text-[#14532d] mb-4">ডেকোরেশন খরচ</h3>
    </button>

                
    <button  className="w-full text-left bg-[#f0f9ff] cursor-pointer p-6 rounded-lg hover:bg-blue-100 shadow-md border border-[#bae6fd]">
      <h3 className="text-xl font-semibold text-center text-[#1e40af] mb-4">খড়ি বাবদ খরচ</h3>
    </button>

                
  </div>
</div>


    );
};

export default AddExpenseList;