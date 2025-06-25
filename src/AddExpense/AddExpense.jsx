import React, { useState } from 'react';

const AddExpense = () => {
  const [expenseValue, setExpenseValue] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.text.value;
    const number = form.number.value;

    const newExpense = {
      id: Date.now(),
      text,
      number,
      date: new Date().toLocaleDateString("bn-BD") 
    };

    setExpenseValue([newExpense, ...expenseValue]);

    form.reset();
  };

   

  const total = expenseValue.reduce((sum, item) => sum + parseFloat(item.number), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-red-600 text-center mb-6">💸 খরচ ম্যানেজমেন্ট</h2>

      {/* ফর্ম */}
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-red-600 mb-4">➖ খরচ যোগ করুন</h3>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-4 gap-4">
          <input
            type="text"
            name="text"
            placeholder="খরচের নাম"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="number"
            placeholder="পরিমাণ (৳)"
            className="input input-bordered w-full"
            required
          />
          <button
            type="submit"
            className="btn bg-red-600 text-white hover:bg-red-700 w-full"
          >
            ➕ যোগ করুন
          </button>
        </form>

        <div className="text-right mt-4 text-lg font-semibold text-red-600">
          মোট খরচ: ৳ {total.toFixed(2)}
        </div>
      </div>

      {/* টেবিল */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-red-600 mb-4">📋 খরচের তালিকা</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border border-base-300">
            <thead className="bg-red-100 text-red-700">
              <tr>
                <th className="text-left px-4 py-2">তারিখ</th>
                <th className="text-left px-4 py-2">খরচের নাম</th>
                <th className="text-left px-4 py-2">পরিমাণ (৳)</th>
                <th className="text-left px-4 py-2">অ্যাকশন</th> 
                </tr>
            </thead>
            <tbody>
              {expenseValue.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-2">{a.date}</td>
                  <td className="px-4 py-2">{a.text}</td>
                  <td className="px-4 py-2 text-red-700 font-medium">৳ {parseFloat(a.number).toFixed(2)}</td>
                      <td >
                          <button className='btn hover:bg-gradient-to-b from-orange-700 to-orange-600 border-orange-700 hover:text-white'>Delete</button>
                  </td>
                </tr>
              ))}
              {expenseValue.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    এখনো কোনো খরচ যোগ করা হয়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
