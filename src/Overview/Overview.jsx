import React, { useEffect, useState } from 'react';

const Overview = () => {

  const [uttarParatk, setUttarParaTk] = useState([])
  const [dokhinParatk, setDokhinParaTk] = useState([])
  const [majhaParatk, setMajhaParaTk] = useState([])

  
  useEffect(() => {
    fetch('http://localhost:3000/uttarPara/totalTk')
      .then(res => res.json())
    .then(data =>setUttarParaTk(data))
    
  }, [])
  
  useEffect(() => {
    fetch('http://localhost:3000/dokkhinParaTotalTk')
      .then(res => res.json())
    .then(data =>setDokhinParaTk(data))
    
  }, [])
  
  useEffect(() => {
    fetch('http://localhost:3000/majhaParaTotalTk')
      .then(res => res.json())
    .then(data => setMajhaParaTk(data))
    
  }, [])
  

  const totalTkUttarPara = uttarParatk[0]?.totalTk || 0
  const totalTkDokkhinPara = dokhinParatk[0]?.totalTk || 0
  const totalTkMajhaPara = majhaParatk[0]?.totalTk || 0
  
  console.log(majhaParatk)



  return (
    <div className="max-w-6xl mx-auto h-full bg-[#f3f4f6] dark:bg-[#1E2939] dark:border dark:border-white px-6 py-12 transition-colors duration-300">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-green-700 dark:text-green-400 mb-10">
        📊 সারাংশ (Overview)
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <h4 className="text-xl font-bold text-center mb-2">মোট আয়</h4>
          <p className="text-3xl font-bold text-center">৳ ১,২০,০০০</p>
        </div>

        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <h4 className="text-xl font-bold text-center mb-2">মোট ব্যয়</h4>
          <p className="text-3xl font-bold text-center">৳ ৭৫,৫০০</p>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <h4 className="text-xl font-bold text-center mb-2">বর্তমান ব্যালেন্স</h4>
          <p className="text-3xl font-bold text-center">৳ ৪৪,৫০০</p>
        </div>
      </div>

      {/* Area-wise Table */}
      <div className="bg-white dark:bg-[#1E2939] border border-gray-200 dark:border-white rounded-xl overflow-x-auto shadow-md">
        <h3 className="text-2xl font-semibold dark:text-white text-gray-800 px-6 py-4 border-b border-gray-200 dark:border-white">
          🏘️ পাড়া ভিত্তিক হিসাব
        </h3>

        <table className="min-w-full text-sm text-center dark:text-white">
          <thead className="bg-gray-100 dark:bg-[#334155] text-gray-700 dark:text-white text-md">
            <tr>
              <th className="px-6 py-3 border">পাড়া</th>
              <th className="px-6 py-3 border">প্রণামী</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1E2939]">
            {[
              { para: 'উত্তর পাড়া', income: `${totalTkUttarPara.toFixed(2)}`, expense: '৳১০,০০০' },
              { para: 'মাঝা পাড়া', income:` ${totalTkMajhaPara.toFixed(2)}`, expense: '৳১৫,০০০' },
              { para: 'দক্ষিণ পাড়া', income:  ` ${totalTkDokkhinPara.toFixed(2)}`, expense: '৳২০,০০০' },
              { para: 'বাইরের অনুদান', income: '৳৪০,০০০', expense: '৳৩০,০০০' },
            ].map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
              >
                <td className="border px-6 py-3">{item.para}</td>
                <td className="border px-6 font-semibold py-3">{item?.income}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
