import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";

const Stats = () => {
    const [totalAddIncome, setTotalAddIncome] = useState(null)
    const [totalExpenseIncome, setTotalExpenseIncome] = useState(null)
    const [loading , setLoading] = useState(true)

    useEffect(() => {

        fetch('http://localhost:3000/totalAddIncome')
            .then(res => res.json())
            .then(data => {
                setTotalAddIncome(data)
                setLoading(false)
        })
        
    },[])

    useEffect(() => {

        fetch('http://localhost:3000/totalExpenseIncome')
            .then(res => res.json())
            .then(data => {
              setTotalExpenseIncome(data)
                setLoading(false)
        })
        
    },[])
    if (loading) {
        return <Loading></Loading>
    }


  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-orange-700  dark:text-white mb-2">সারাংশ (Overview)</h2>
      
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
              <th className="py-3 px-4 border-b dark:border-gray-600">Category</th>
              <th className="py-3 px-4 border-b dark:border-gray-600">Amount (Tk)</th>
            </tr>
          </thead>
          <tbody>
  <tr className="bg-green-100 dark:bg-green-900">
    <td className="py-2 px-4 border-b dark:border-gray-700 font-medium text-green-700 dark:text-green-300">
  ভক্তের অনুদান
    </td>
    <td className="py-2 px-4 border-b dark:border-gray-700 font-semibold text-green-700 dark:text-green-300">
      ৳ {totalAddIncome?.totalTk.toFixed(2)}
    </td>
  </tr>

  <tr className="bg-red-100 dark:bg-red-900">
    <td className="py-2 px-4 border-b dark:border-gray-700 font-medium text-red-700 dark:text-red-300">
  মন্দিরের অন্যান্য ব্যয়
    </td>
    <td className="py-2 px-4 border-b dark:border-gray-700 font-semibold text-red-700 dark:text-red-300">
      ৳ {totalExpenseIncome?.totalTk.toFixed(2)}
    </td>
  </tr>
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Stats;
