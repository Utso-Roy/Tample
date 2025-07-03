import React from "react";
import {
  FaHome,
  FaPlus,
  FaList,
  FaChartBar,
  FaCalendarAlt,
  FaFileUpload,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Sidebar = () => {
  
  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 cursor-pointer rounded px-2 py-1 select-none 
    ${isActive ? "bg-orange-700 font-bold" : "hover:bg-orange-600 dark:hover:bg-orange-700"}`;

  return (
    <aside className="w-64 sticky dark:border-b-2 dark:border-t-2 top-8 bg-orange-600 dark:bg-[#1E2939] text-white p-4 shadow-xl min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center select-none">
        Mandir Accounts
      </h2>

      <nav className="space-y-4" aria-label="Main Navigation">
        {/* Dashboard Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaHome /> Dashboard
          </h3>
          <ul className="space-y-1 pl-6">
            <NavLink to="/overview" className={navItemClass}>
              <FaList /> Overview
            </NavLink>
            <NavLink to="/stats" className={navItemClass}>
              <FaChartBar /> Stats
            </NavLink>
          </ul>
        </div>

        {/* Income Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaPlus /> Income
          </h3>
          <ul className="space-y-1 pl-6">
            <NavLink to="/addIncome" className={navItemClass}>
              <FaPlus /> Add Income
            </NavLink>
            <NavLink to="/incomeList" className={navItemClass}>
              <FaList /> Income List
            </NavLink>
            <NavLink to="/incomeReport" className={navItemClass}>
              <FaChartBar /> Income Report
            </NavLink>
          </ul>
        </div>

        {/* Expenses Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaPlus /> Expenses
          </h3>
          <ul className="space-y-1 pl-6">
            <NavLink to="/addExpense" className={navItemClass}>
              <FaPlus /> Add Expense
            </NavLink>
            <NavLink to="/addExpenseList" className={navItemClass}>
              <FaList /> Expense List
            </NavLink>
            <NavLink to="/expenseReport" className={navItemClass}>
              <FaChartBar /> Expense Report
            </NavLink>
          </ul>
        </div>

        {/* Events Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaCalendarAlt /> Events
          </h3>
          <ul className="space-y-1 pl-6">
            <NavLink to="/pujaSchedule" className={navItemClass}>
              <FaCalendarAlt /> Puja Schedule
            </NavLink>
            <NavLink to="/addEvent" className={navItemClass}>
              <FaPlus /> Add Event
            </NavLink>
            <NavLink to="/eventReport" className={navItemClass}>
              <FaList /> Event Report
            </NavLink>
          </ul>
        </div>

        {/* Files Section */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <FaFileUpload /> Files
          </h3>
          <ul className="space-y-1 pl-6">
            <NavLink to="/uploadReceipt" className={navItemClass}>
              <FaFileUpload /> Upload Receipt
            </NavLink>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
