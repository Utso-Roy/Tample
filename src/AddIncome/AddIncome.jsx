import axios from "axios";
import React, { useState, useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";
import Loading from "../Loader/Loading";

const AddIncome = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("ভক্তবৃন্দ");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const res = await axios.get(
          "https://tample-server.vercel.app/addIncomeData"
        );
        if (res.data.suc) {
          setIncomeList(res.data.data);
          setLoading(false);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Request error:", error);
      }
    };
    fetchIncomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex  justify-center my-40 ">
        <Loading></Loading>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !name || !date) return;

    const newEntry = {
      name,
      amount: parseFloat(amount),
      date,
    };

    try {
      const res = await axios.post(
        "https://tample-server.vercel.app/addIncomeData",
        newEntry
      );
      if (res.data.suc) {
        setIncomeList((prevList) => [res.data.insertedData, ...prevList]);
        setAmount("");
        setDate(new Date().toISOString().split("T")[0]);
        setName("ভক্তবৃন্দ");

        Swal.fire({
          icon: "success",
          title: "সফল",
          text: "ইনকাম সফলভাবে যোগ করা হয়েছে!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ত্রুটি",
          text: "ইনকাম যোগ করা হয়নি!",
        });
      }
    } catch (error) {
      console.error("Request error:", error);
      Swal.fire({
        icon: "error",
        title: "ত্রুটি",
        text: "সার্ভারে সমস্যা হয়েছে!",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই ইনকাম ডেটা ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "বাতিল",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://tample-server.vercel.app/addIncomeData/${id}`
        );
        if (res.data.success) {
          setIncomeList((prev) => prev.filter((item) => item._id !== id));

          Swal.fire({
            icon: "success",
            title: "ডিলিট সম্পন্ন!",
            text: "ইনকাম ডেটা সফলভাবে মুছে ফেলা হয়েছে।",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "ডিলিট ব্যর্থ",
            text: "ডেটা খুঁজে পাওয়া যায়নি।",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "ত্রুটি",
          text: "সার্ভার থেকে ডিলিট করা যায়নি!",
        });
      }
    }
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
  console.table(incomeList);

  const groupedIncomeByDate = incomeList.reduce((acc, curr) => {
    if (!acc[curr?.date]) acc[curr?.date] = 0;
    acc[curr?.date] += curr?.amount;
    return acc;
  }, {});

  return (
    <div className="max-w-5xl  h-[calc(200vh-200px)] overflow-y-auto mx-auto min-h-screen px-4 py-10 bg-[#f3f4f6] dark:bg-[#1E2939] text-gray-900 dark:text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400">
          ইনকাম ম্যানেজমেন্ট
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ভক্তদের ইনকাম যুক্ত করুন এবং নিচে তালিকা দেখুন
        </p>
      </div>

      <div className="bg-white dark:bg-[#2e3a4a] p-6 rounded-lg shadow  dark:border-gray-600">
        <h3 className="text-xl font-semibold flex gap-2 items-center text-orange-600 dark:text-orange-300 mb-4">
          <IoIosAddCircle /> ইনকাম যোগ করুন
        </h3>
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
          <button
            type="submit"
            className="btn bg-orange-600 text-white hover:bg-orange-700 w-full"
          >
            <IoIosAddCircle size={18} className="mr-1" /> যোগ করুন
          </button>
        </form>
      </div>

      <div className="mt-10 bg-white dark:bg-[#2e3a4a] p-6 rounded-lg shadow  dark:border-gray-600">
        <h3 className="text-xl font-semibold mb-4 text-orange-600 dark:text-orange-300 flex gap-2 items-center">
          <CiCalendarDate size={24} /> তারিখ অনুযায়ী মোট ইনকাম
        </h3>
        {Object.keys(groupedIncomeByDate).length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            এখনো কোনো ইনকাম নেই।
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 dark:border-gray-600 text-left">
              <thead className="bg-orange-100 dark:bg-[#334155] text-orange-700 dark:text-orange-300">
                <tr>
                  <th className="p-2">তারিখ</th>
                  <th className="p-2">মোট ইনকাম (৳)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedIncomeByDate).map(([date, total]) => (
                  <tr
                    key={date}
                    className="hover:bg-orange-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-2">{formatDate(date)}</td>
                    <td className="p-2 text-green-700 dark:text-green-400 font-medium">
                      ৳ {total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Income List*/}
      <div className="mt-10 bg-white dark:bg-[#2e3a4a] p-6 rounded-lg shadow  dark:border-gray-600">
        <h3 className="text-xl font-semibold mb-4 text-orange-600 dark:text-orange-300 flex gap-2 items-center">
          <FaClipboardList /> সব ইনকামের তালিকা
        </h3>
        {incomeList.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            এখনো কোনো ইনকাম যুক্ত হয়নি।
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 dark:border-gray-600 text-left">
              <thead className="bg-orange-100 dark:bg-[#334155] text-orange-700 dark:text-orange-300">
                <tr>
                  <th className="p-2">তারিখ</th>
                  <th className="p-2">ভক্তের নাম</th>
                  <th className="p-2">পরিমাণ (৳)</th>
                  <th className="p-2">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {incomeList.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-orange-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-2">{formatDate(item.date)}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-green-700 dark:text-green-400 font-medium">
                      ৳ {item.amount.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 border cursor-pointer border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        Delete
                      </button>
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
