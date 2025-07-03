import React from 'react';

const pujaSchedules = [
  {
    id: 1,
    name: 'দুর্গাপূজা',
    date: '2025-10-02',
    time: 'সকাল ৮:০০ টা',
    location: 'রামপুর কালীমন্দির',
  },
  {
    id: 2,
    name: 'কালীপূজা',
    date: '2025-11-10',
    time: 'রাত ৯:০০ টা',
    location: 'রামপুর শ্মশান মন্দির',
  },
  {
    id: 3,
    name: 'লক্ষ্মীপূজা',
    date: '2025-10-25',
    time: 'সন্ধ্যা ৬:৩০ টা',
    location: 'উত্তরপাড়া মন্দির',
  },
];

const PujaSchedule = () => {
  return (
    <div className="w-full mx-auto px-4 py-10 bg-[#f3f4f6] dark:bg-[#1E2939] h-full dark:border-2 dark:border-white ">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600 dark:text-orange-400 flex justify-center items-center gap-2">
        <img src="https://i.ibb.co/yqtRBX4/calendar.png" alt="calendar" className="w-8 h-8" />
        পূজার সময়সূচি
      </h2>

      <div className="grid gap-6">
        {pujaSchedules.map((puja) => (
          <div
            key={puja.id}
            className="bg-white dark:bg-[#334155] p-6 rounded-xl shadow-md border-l-4 border-orange-500 transition-all"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{puja.name}</h3>
            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">📍 স্থান:</span> {puja.location}</p>
            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">📅 তারিখ:</span> {puja.date}</p>
            <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">⏰ সময়:</span> {puja.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PujaSchedule;
