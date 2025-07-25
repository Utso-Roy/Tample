import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaClipboardList, FaRegMoneyBillAlt } from "react-icons/fa";
import { IoIosAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import Loading from "../Loader/Loading";
const AddExpense = () => {
  const [expenseValue, setExpenseValue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    const res = await axios.get("https://tample-server.vercel.app/expenses");
    {
      setExpenseValue(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.text.value;
    const number = form.number.value;

    const newExpense = {
      text,
      number,
      date: new Date().toLocaleDateString("bn-BD"),
    };

    const res = await axios.post(
      "https://tample-server.vercel.app/expenses",
      newExpense
    );
    if (res.data.insertedId || res.data.acknowledged) {
      fetchExpenses();
      form.reset();

      Swal.fire({
        icon: "success",
        title: "খরচ সফলভাবে যোগ হয়েছে",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "তুমি কি নিশ্চিত?",
      text: "এই খরচটি ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, ডিলিট করো",
      cancelButtonText: "না",
    });

    if (result.isConfirmed) {
      await axios.delete(`https://tample-server.vercel.app/expenses/${id}`);
      fetchExpenses();

      Swal.fire(
        "ডিলিট হয়েছে!",
        "তোমার খরচ সফলভাবে ডিলিট করা হয়েছে।",
        "success"
      );
    }
  };

  const total = expenseValue.reduce(
    (sum, item) => sum + parseFloat(item.number),
    0
  );

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-[#1E2939] dark:border dark:border-white rounded-xl shadow">
      {/* 🔙 Back Button */}
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1 text-orange-600 dark:text-orange-300 cursor-pointer hover:underline"
        >
          <MdArrowBack size={20} /> ফিরে যাও
        </button>
      </div>

      <h2 className="text-3xl font-bold flex gap-2 justify-center items-center text-red-600 dark:text-red-400 mb-6">
        <FaRegMoneyBillAlt /> খরচ ম্যানেজমেন্ট
      </h2>

      {/* Form */}
      <div className="bg-white dark:bg-[#334155] rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold flex gap-2 items-center text-red-600 dark:text-red-400 mb-4">
          <IoIosAddCircle /> খরচ যোগ করুন
        </h3>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-4 gap-4">
          <input
            type="text"
            name="text"
            placeholder="খরচের নাম"
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
            required
          />
          <input
            type="number"
            name="number"
            placeholder="পরিমাণ (৳)"
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
            required
          />
          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 text-white w-full"
          >
            <IoMdAddCircleOutline size={18} /> যোগ করুন
          </button>
        </form>

        <div className="text-right mt-4 text-lg font-semibold text-red-600 dark:text-red-400">
          মোট খরচ: ৳ {total.toFixed(2)}
        </div>
      </div>

      {/* Table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold flex gap-2 items-center text-red-600 dark:text-red-400 mb-4">
          <FaClipboardList /> খরচের তালিকা
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border border-base-300 dark:border-gray-600">
            <thead className="bg-red-100 dark:bg-[#475569] text-red-700 dark:text-white">
              <tr>
                <th className="text-left px-4 py-2">তারিখ</th>
                <th className="text-left px-4 py-2">খরচের নাম</th>
                <th className="text-left px-4 py-2">পরিমাণ (৳)</th>
                <th className="text-left px-4 py-2">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {expenseValue.map((item) => (
                <tr key={item._id} className="dark:text-white">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.text}</td>
                  <td className="px-4 py-2 text-red-700 dark:text-red-300 font-medium">
                    ৳ {parseFloat(item.number).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn hover:bg-gradient-to-b from-orange-700 to-orange-600 border-orange-700 hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {expenseValue.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 font-semibold text-gray-500 dark:text-gray-400"
                  >
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
