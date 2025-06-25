import React, { useState } from 'react';

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState( 'ভক্তবৃন্দ' );
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [incomeList, setIncomeList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !name || !date) return;

    const newEntry = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      date,
    };

    setIncomeList([newEntry, ...incomeList]);
    setAmount('');
    // setName('');
    setDate(new Date().toISOString().split("T")[0]);
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const todayIncome = incomeList.filter(item => item.date === today);
  const tomorrowIncome = incomeList.filter(item => item.date === tomorrow);
  const totalToday = todayIncome.reduce((sum, item) => sum + item.amount, 0);
  const totalTomorrow = tomorrowIncome.reduce((sum, item) => sum + item.amount, 0);

  // 👉 Grouped income by date
  const groupedIncomeByDate = incomeList.reduce((acc, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = 0;
    }
    acc[curr.date] += curr.amount;
    return acc;
  }, {});

  return (
    <div className="max-w-4xl  h-[calc(200vh-200px)] overflow-y-auto  mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-600">ইনকাম ম্যানেজমেন্ট</h2>
        <p className="text-gray-500">ভক্তদের ইনকাম যুক্ত করুন এবং নিচে তালিকা দেখুন</p>
      </div>

      {/* Form Card */}
      <div className="card bg-base-100 shadow-md border border-gray-200">
        <div className="card-body space-y-4">
          <h3 className="text-xl font-semibold text-orange-600">ইনকাম যোগ করুন</h3>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-4 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ভক্তের নাম"
              className="input input-bordered w-full"
              required
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="টাকার পরিমাণ"
              className="input input-bordered w-full"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <button type="submit" className="btn bg-orange-600 text-white hover:bg-orange-700 w-full">
               যোগ করুন
            </button>
          </form>

          {/* Total Summary */}
          <div className="text-right space-y-1">
            <p className="text-green-600 font-semibold">আজকের মোট ইনকাম: ৳ {totalToday.toFixed(2)}</p>
            <p className="text-blue-600 font-semibold">আগামীকালের ইনকাম: ৳ {totalTomorrow.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Daily Total Income Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">📅 তারিখ অনুযায়ী মোট ইনকাম</h3>
        {Object.keys(groupedIncomeByDate).length === 0 ? (
          <div className="text-gray-500">এখনো কোনো ইনকাম নেই।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full border border-base-300">
              <thead className="bg-orange-100 text-orange-700">
                <tr>
                  <th className="text-left px-4 py-2">তারিখ</th>
                  <th className="text-left px-4 py-2">মোট ইনকাম (৳)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedIncomeByDate).map(([date, total]) => (
                  <tr key={date}>
                    <td className="px-4 py-2">{formatDate(date)}</td>
                    <td className="px-4 py-2 text-green-700 font-medium">৳ {total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Income Table Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">📋 সব ইনকামের তালিকা</h3>
        {incomeList.length === 0 ? (
          <div className="text-gray-500">এখনো কোনো ইনকাম যুক্ত হয়নি।</div>
        ) : (
          <div className="overflow-x-auto ">
            <table className="table  table-zebra w-full border border-base-300">
              <thead className="bg-orange-100 text-orange-700">
                <tr>
                  <th className="text-left px-4 py-2">তারিখ</th>
                  <th className="text-left px-4 py-2">ভক্তের নাম</th>
                                      <th className="text-left px-4 py-2">পরিমাণ (৳)</th>
                                      <th className="text-left px-4 py-2">অ্যাকশন</th> 
                </tr>
              </thead>
              <tbody>
                {incomeList.map((item) => (
                  <tr  key={item.id}>
                    <td className="px-4 py-2">{formatDate(item.date)}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 text-green-700 font-medium">
                      ৳ {item.amount.toFixed(2)}
                        </td>
                        <td >
                            <button className='btn hover:bg-gradient-to-b from-orange-700 to-orange-600 border-orange-700 hover:text-white'>Delete</button>

                        </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddIncome;
