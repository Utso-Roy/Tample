import React, { useEffect, useState } from 'react';
import Loading from "../Loader/Loading";

const Overview = () => {
  const [uttarParatk, setUttarParaTk] = useState([]);
  const [dokhinParatk, setDokhinParaTk] = useState([]);
  const [majhaParatk, setMajhaParaTk] = useState([]);
  const [outCollectiontk, setOutCollectionTk] = useState([]);
  const [totalRice , setTotalRice] = useState(null)
  const [loading,setLoading] = useState(true)

    const [totalExpenseValue , setTotalExpenseValue] = useState(null)
  
  
  
    useEffect(() => {
    
      fetch('http://localhost:3000/totalExpenseAllBills')
        .then(res => res.json())
        .then(data => {
          setTotalExpenseValue(data)
          setLoading(false)
      })
  },[])
  
console.log(totalExpenseValue)
  // Data fetching
  useEffect(() => {
    fetch('http://localhost:3000/uttarPara/totalTk')
      .then(res => res.json())
      .then(data => setUttarParaTk(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/dokkhinParaTotalTk')
      .then(res => res.json())
      .then(data => setDokhinParaTk(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/majhaParaTotalTk')
      .then(res => res.json())
      .then(data => setMajhaParaTk(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/outCollectionTk')
      .then(res => res.json())
      .then(data => setOutCollectionTk(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/totalRiceCollection')
      .then(res => res.json())
      .then(data => setTotalRice(data));
  }, []);

  console.log(totalRice)
  // Extracted values
  const totalTkUttarPara = uttarParatk[0]?.totalTk || 0;
  const totalTkDokkhinPara = dokhinParatk[0]?.totalTk || 0;
  const totalTkMajhaPara = majhaParatk[0]?.totalTk || 0;
  const totalTkOutCollection = outCollectiontk[0]?.totalTk || 0;

  // Para-wise array and total calculation
  const paraCollection = [
    { para: 'উত্তর পাড়া', amount: totalTkUttarPara },
    { para: 'মাঝা পাড়া', amount: totalTkMajhaPara },
    { para: 'দক্ষিণ পাড়া', amount: totalTkDokkhinPara },
    { para: 'বাইরের অনুদান', amount: totalTkOutCollection },
  ];

  const totalCollection = paraCollection.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  if (loading) {
    return <Loading></Loading>
  }



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
          <p className="text-3xl font-bold text-center">৳ {totalCollection.toFixed(2)}</p>
        </div>

        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <h4 className="text-xl font-bold text-center mb-2">মোট ব্যয়</h4>
          <p className="text-3xl font-bold text-center">৳ {totalExpenseValue?. totalTk.toFixed(2)}</p>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <h4 className="text-xl font-bold text-center mb-2">বর্তমান ব্যালেন্স</h4>
          <p className="text-3xl font-bold text-center">৳ {(totalCollection.toFixed() - totalExpenseValue?.totalTk.toFixed(2)).toFixed(2)}</p>
        </div>
      </div>

      {/* Area-wise Table */}
      {/* Area-wise Table */}
<div className="bg-white dark:bg-[#1E2939] border-2 border-gray-200 dark:border-white rounded-xl overflow-hidden shadow-lg">
  <h3 className="text-2xl font-semibold dark:text-white text-gray-800 px-6 py-4 bg-gray-100 dark:bg-[#334155] border-b border-gray-200 dark:border-white">
    🏘️ পাড়া ভিত্তিক হিসাব
  </h3>

  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-center dark:text-white">
      <thead className="bg-green-50 dark:bg-green-800 text-green-800 dark:text-green-100 uppercase tracking-wider text-xs font-semibold">
        <tr>
          <th className="px-6 py-4 border-b-2 border-green-300 font-bold dark:border-green-300">পাড়া</th>
          <th className="px-6 py-4 border-b-2 border-green-300 font-bold dark:border-green-300">প্রণামী</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-[#1E2939] divide-y divide-gray-200 dark:divide-gray-700">
        {paraCollection.map((item, index) => (
          <tr
            key={index}
            className="hover:bg-green-50 dark:hover:bg-[#334155] transition-colors duration-200"
          >
            <td className="px-6 py-4 font-medium text-gray-800 dark:text-white border-r-2 border-green-300 dark:border-green-300">
              {item.para}
            </td>
            <td className="px-6 py-4 font-semibold text-green-700 dark:text-green-300">
              ৳ {item.amount.toFixed(2)}
            </td>
          </tr>
        ))}
        <tr className="hover:bg-yellow-50 dark:hover:bg-[#334155] transition-colors duration-200">
          <td className="px-6 py-4 font-medium text-gray-800 dark:text-white border-r-2 border-green-300 dark:border-green-300">
            চাল
          </td>
          <td className="px-6 py-4 font-semibold text-yellow-700 dark:text-yellow-300">
            {totalRice?.totalRiceIncome} kg
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default Overview;
