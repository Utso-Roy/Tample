import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaClipboardList, FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoIosAddCircle, IoMdAddCircleOutline } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md'; 

const RiceCollection = () => {
    const [name, setName] = useState('');
    const [kg, setKg] = useState('');
    const [dataList, setDataList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && kg) {
            const newData = {
                id: Date.now(),
                name,
                kg: parseFloat(kg),
                date: new Date().toLocaleDateString("bn-BD")
            };
            setDataList([newData, ...dataList]);
            setName('');
            setKg('');

            Swal.fire({
                icon: 'success',
                title: 'সফলভাবে যুক্ত হয়েছে!',
                text: `${newData.kg.toFixed(2)} কেজি চাল ${newData.name} নামের জন্য যোগ করা হয়েছে।`,
                confirmButtonColor: '#14532d'
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "এই অনুদানটি মুছে ফেলতে চান?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#14532d',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'হ্যাঁ, মুছে ফেলুন',
            cancelButtonText: 'না'
        }).then((result) => {
            if (result.isConfirmed) {
                const newList = dataList.filter(item => item.id !== id);
                setDataList(newList);
                Swal.fire('মুছে ফেলা হয়েছে!', 'অনুদানটি সফলভাবে মুছে ফেলা হয়েছে।', 'success');
            }
        });
    };

    const totalKg = dataList.reduce((total, item) => total + item.kg, 0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">

            {/* Back Button */}
            <div className="mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center  cursor-pointer gap-2 text-[#14532d] hover:text-green-700 font-medium"
                >
                    <MdArrowBack size={22} /> পেছনে যান
                </button>
            </div>

            {/* Header */}
            <h2 className="text-3xl font-bold flex gap-2 justify-center items-center text-[#14532d] dark:text-green-400 mb-8">
                <FaRegMoneyBillAlt size={30} /> চাল সংগ্রহ ব্যবস্থাপনা
            </h2>

            {/* Form Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 rounded-xl p-6">
                <h3 className="text-2xl flex gap-2 items-center font-semibold text-[#14532d] dark:text-green-400 mb-4">
                    <IoIosAddCircle size={24} /> চাল যোগ করুন
                </h3>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-4 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="দানকারীর নাম"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                        required
                    />
                    <input
                        type="number"
                        name="kg"
                        placeholder="পরিমাণ (কেজি)"
                        value={kg}
                        onChange={(e) => setKg(e.target.value)}
                        className="input input-bordered w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                        step="0.01"
                        min="0"
                        required
                    />
                    <button
                        type="submit"
                        className="btn bg-[#14532d] text-white hover:bg-green-800 w-full flex justify-center items-center gap-2"
                    >
                        <IoMdAddCircleOutline size={18} /> যোগ করুন
                    </button>
                </form>

                <div className="text-right mt-6 text-lg font-semibold text-[#14532d] dark:text-green-400">
                    মোট চাল: <span className="text-xl font-bold">{totalKg.toFixed(2)} কেজি</span>
                </div>
            </div>

            {/* Table Section */}
            <div className="mt-10">
                <h3 className="text-2xl flex gap-2 items-center font-semibold text-[#14532d] dark:text-green-400 mb-4">
                    <FaClipboardList size={22} /> চালের তালিকা
                </h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600">
                    <table className="table table-zebra w-full">
                        <thead className="bg-[#d1fae5] dark:bg-gray-700 text-[#14532d] dark:text-green-400">
                            <tr>
                                <th className="text-left px-4 py-3">তারিখ</th>
                                <th className="text-left px-4 py-3">নাম</th>
                                <th className="text-left px-4 py-3">পরিমাণ (কেজি)</th>
                                <th className="text-left px-4 py-3">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((item) => (
                                <tr key={item.id} className="hover:bg-[#d1fae5] dark:hover:bg-gray-800">
                                    <td className="px-4 py-2 text-[#14532d] dark:text-green-300">{item.date}</td>
                                    <td className="px-4 py-2 text-[#14532d] dark:text-green-300">{item.name}</td>
                                    <td className="px-4 py-2 text-[#14532d] dark:text-green-300 font-medium">
                                        {item.kg.toFixed(2)} কেজি
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="btn border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {dataList.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 font-semibold text-gray-500 dark:text-gray-400">
                                        এখনো কোনো চাল যোগ করা হয়নি।
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

export default RiceCollection;
