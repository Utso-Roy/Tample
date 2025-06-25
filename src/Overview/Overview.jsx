import React from 'react';

const Overview = () => {
  return (
    <div className="max-w-6xl mx-auto bg-[#f3f4f6] h-full p-5">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">📊 সারাংশ (Overview)</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h4 className="text-xl font-bold text-green-800">মোট আয়</h4>
          <p className="text-2xl font-semibold text-green-700">৳১,২০,০০০</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow text-center">
          <h4 className="text-xl font-bold text-red-800">মোট ব্যয়</h4>
          <p className="text-2xl font-semibold text-red-700">৳৭৫,৫০০</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
          <h4 className="text-xl font-bold text-yellow-800">বর্তমান ব্যালেন্স</h4>
          <p className="text-2xl font-semibold text-yellow-700">৳৪৪,৫০০</p>
        </div>
      </div>

      {/* Area-wise income and expense */}
      <div className="bg-white shadow p-6 rounded-lg overflow-x-auto">
        <h3 className="text-xl font-bold text-gray-700 mb-4"> পাড়া ভিত্তিক হিসাব</h3>
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">পাড়া</th>
              <th className="border p-2">ইনকাম</th>
              <th className="border p-2">ব্যয়</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">উত্তর পাড়া</td>
              <td className="border p-2">৳২০,০০০</td>
              <td className="border p-2">৳১০,০০০</td>
            </tr>
            <tr>
              <td className="border p-2">মাঝা পাড়া</td>
              <td className="border p-2">৳৩৫,০০০</td>
              <td className="border p-2">৳১৫,০০০</td>
            </tr>
            <tr>
              <td className="border p-2">দক্ষিণ পাড়া</td>
              <td className="border p-2">৳২৫,০০০</td>
              <td className="border p-2">৳২০,০০০</td>
            </tr>
            <tr>
              <td className="border p-2">বাইরের অনুদান</td>
              <td className="border p-2">৳৪০,০০০</td>
              <td className="border p-2">৳৩০,০০০</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
