import React from "react";
import {
  FaHome,
  FaPlus,
  FaList,
  FaChartBar,
  FaCalendarAlt,
  FaFileUpload,
} from "react-icons/fa";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside className="w-64 sticky top-8 bg-gradient-to-b from-orange-700 to-orange-600 text-white p-4 shadow-xl min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center select-none"> Mandir Accounts</h2>

      <nav className="space-y-4" aria-label="Main Navigation">
        {/* Dashboard Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaHome /> Dashboard
          </h3>
          <ul className="space-y-1 pl-6">
            <button className="flex items-center gap-2 cursor-pointer hover:bg-orange-800 rounded px-2 py-1 select-none">
              <FaList /> Overview
            </button>
            <button className="flex items-center gap-2 cursor-pointer hover:bg-orange-800 rounded px-2 py-1 select-none">
              <FaChartBar /> Stats
            </button>
          </ul>
        </div>

        {/* Income Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaPlus /> Income
          </h3>
          <ul className="space-y-1 pl-6">
            <Link to="/addIncome" className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaPlus /> Add Income
            </Link>
            <Link to="/incomeList" className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaList /> Income List
            </Link>
            <Link to="/incomeReport" className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaChartBar /> Income Report
            </Link>
          </ul>
        </div>

        {/* Expenses Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaPlus /> Expenses
          </h3>
          <ul className="space-y-1 pl-6">
            <Link to="/addExpense" className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaPlus /> Add Expense
            </Link>
            <Link to="/addExpenseList" className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaList /> Expense List
            </Link>
            <button className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaChartBar /> Expense Report
            </button>
          </ul>
        </div>

        {/* Events Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaCalendarAlt /> Events
          </h3>
          <ul className="space-y-1 pl-6">
            <button className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaCalendarAlt /> Puja Schedule
            </button>
            <button className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaPlus /> Add Event
            </button>
            <button className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaList /> Event Report
            </button>
          </ul>
        </div>

        {/* Files Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaFileUpload /> Files
          </h3>
          <ul className="space-y-1 pl-6">
            <button className="flex items-center gap-2 cursor-pointer hover:bg-orange-700 rounded px-2 py-1 select-none">
              <FaFileUpload /> Upload Receipt
            </button>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
