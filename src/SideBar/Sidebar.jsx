import React, { useState } from 'react';
import {
  FaHome,
  FaPlus,
  FaList,
  FaChartBar,
  FaCalendarAlt,
  FaFileUpload,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

const Sidebar = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null); 
    } else {
      setOpenSection(section); 
    }
  };

  return (
    <div className="w-64 sticky top-30 z-500   bg-gradient-to-b from-orange-700 to-orange-600 text-white p-4 shadow-xl h-auto">
      <div className="text-2xl font-bold mb-6 text-center">
        🛕 Mandir Accounts
      </div>

      <nav className="space-y-2">
        <DropdownSection
          title="Dashboard"
          icon={<FaHome />}
          isOpen={openSection === 'dashboard'}
          onToggle={() => toggleSection('dashboard')}
        >
          <MenuItem icon={<FaList />} label="Overview" />
          <MenuItem icon={<FaChartBar />} label="Stats" />
        </DropdownSection>

        <DropdownSection
          title="Income"
          isOpen={openSection === 'income'}
          onToggle={() => toggleSection('income')}
        >
          <MenuItem icon={<FaPlus />} label="Add Income" />
          <MenuItem icon={<FaList />} label="Income List" />
          <MenuItem icon={<FaChartBar />} label="Income Report" />
        </DropdownSection>

        <DropdownSection
          title="Expenses"
          isOpen={openSection === 'expenses'}
          onToggle={() => toggleSection('expenses')}
        >
          <MenuItem icon={<FaPlus />} label="Add Expense" />
          <MenuItem icon={<FaList />} label="Expense List" />
          <MenuItem icon={<FaChartBar />} label="Expense Report" />
        </DropdownSection>

        <DropdownSection
          title="Events"
          isOpen={openSection === 'events'}
          onToggle={() => toggleSection('events')}
        >
          <MenuItem icon={<FaCalendarAlt />} label="Puja Schedule" />
          <MenuItem icon={<FaPlus />} label="Add Event" />
          <MenuItem icon={<FaList />} label="Event Report" />
        </DropdownSection>

        <DropdownSection
          title="Files"
          isOpen={openSection === 'files'}
          onToggle={() => toggleSection('files')}
        >
          <MenuItem icon={<FaFileUpload />} label="Upload Receipt" />
        </DropdownSection>
      </nav>
    </div>
  );
};

const MenuItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-5 py-2 hover:bg-orange-700 rounded cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

const DropdownSection = ({ title, icon, children, isOpen, onToggle }) => {
  return (
    <div>
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-orange-800 rounded"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          {icon ?? <FaChevronDown />}
          <span className="font-semibold">{title}</span>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && <div className="ml-4 mt-1 space-y-1">{children}</div>}
    </div>
  );
};

export default Sidebar;
