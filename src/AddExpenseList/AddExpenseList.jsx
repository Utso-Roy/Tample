import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AddExpenseList = () => {
  const [totalExpenseValue, setTotalExpenseValue] = useState(null);

  useEffect(() => {
    fetch("https://tample-server.vercel.app/totalExpenseAllBills")
      .then((res) => res.json())
      .then((data) => setTotalExpenseValue(data));
  }, []);

  const expenseItems = [
    {
      title: "পূজার খরচ",
      link: "/expenses/puja",
      bg: "bg-red-100",
      text: "text-red-800",
      hover: "hover:bg-red-200",
    },
    {
      title: "বিদ্যুৎ বিল",
      link: "/expenses/electricity",
      bg: "bg-blue-100",
      text: "text-blue-800",
      hover: "hover:bg-blue-200",
    },
    {
      title: "প্রসাদের খরচ",
      link: "/expenses/prasad",
      bg: "bg-purple-100",
      text: "text-purple-800",
      hover: "hover:bg-purple-200",
    },
    {
      title: "বাহিরের খরচ",
      link: "/expenses/outside",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      hover: "hover:bg-yellow-200",
    },
    {
      title: "ডেকোরেশন খরচ",
      link: "/expenses/decoration",
      bg: "bg-green-100",
      text: "text-green-800",
      hover: "hover:bg-green-200",
    },
    {
      title: "খড়ি বাবদ খরচ",
      link: "/expenses/kharhi",
      bg: "bg-cyan-100",
      text: "text-cyan-800",
      hover: "hover:bg-cyan-200",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-[#1E293B] shadow rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
        <img
          src="https://i.ibb.co/Q3K1Q4MC/spending.png"
          alt="Expense"
          className="w-10 h-10"
        />
        ব্যয় তালিকা
      </h2>

      <h3 className="text-xl font-semibold text-center mb-10 text-red-700 dark:text-red-300">
        মোট ব্যয় : <span>{totalExpenseValue?.totalTk.toFixed(2)} টাকা</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {expenseItems.map((item, index) => (
          <Link
            to={item?.link}
            key={index}
            className={`block p-5 rounded-lg shadow  transition text-center dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white ${item.bg} ${item.text} ${item.hover}`}
          >
            <h4 className="text-lg font-medium">{item?.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AddExpenseList;
