import React from 'react';
import { Link } from 'react-router';

const IncomeList = () => {
 

  return (
   <div className="max-w-5xl mx-auto h-full px-4 py-10 bg-[#f3f4f6]">
  <h2 className="text-3xl font-bold flex gap-2 justify-center items-center mb-8 text-[#166534]">
    <img className='w-10 h-10' src="https://i.ibb.co/SXSZ6bXc/salary.png" alt="Income" />
    ইনকাম তালিকা
  </h2>
  <h2 className="text-3xl font-bold text-center mb-8 text-[#166534]">
    মোট টাকা : <span> ১২০০০০ টাকা</span>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
   
    <Link to="/uttarPara" className="bg-[#ecfdf5] cursor-pointer p-6 hover:bg-green-200 rounded-lg shadow-md border border-[#a7f3d0]">
      <h3 className="text-xl font-semibold text-center text-[#065f46] mb-4">উত্তর পাড়া কালেকশন</h3>
      <ul className="space-y-2">
       
      </ul>
    </Link>

    <Link to="/MajaPara" className="bg-[#fef9c3] cursor-pointer p-6 rounded-lg hover:bg-amber-200 shadow-md border border-[#fde68a]">
      <h3 className="text-xl font-semibold text-center text-[#92400e] mb-4">মাজা পাড়া কালেকশন</h3>
      <ul className="space-y-2">
      
      </ul>
    </Link>

 
    <Link to="/dokkhinPara" className="bg-[#fdf2f8] cursor-pointer p-6 hover:bg-red-200 rounded-lg shadow-md border border-[#fbcfe8]">
      <h3 className="text-xl font-semibold text-center text-[#9d174d] mb-4">দক্ষিণ পাড়া কালেকশন</h3>
      <ul className="space-y-2">
      
      </ul>
    </Link>

    <Link to="/outCollection" className="bg-[#fef2f2] cursor-pointer p-6 hover:bg-red-200 rounded-lg shadow-md border border-[#fecaca]">
      <h3 className="text-xl font-semibold text-center text-[#7f1d1d] mb-4">বাইরের কালেকশন</h3>
      <ul className="space-y-2">
     
      </ul>
    </Link>

   
    <Link to="/riceCollection" className="bg-[#f0fdf4] hover:bg-green-200 cursor-pointer p-6 rounded-lg shadow-md border border-[#bbf7d0]">
      <h3 className="text-xl font-semibold text-center text-[#14532d] mb-4">চাল কালেকশন</h3>
      <ul className="space-y-2">
      
      </ul>
    </Link>

  </div>
</div>


  );
};

export default IncomeList;
