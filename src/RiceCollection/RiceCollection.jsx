import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaClipboardList, FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoIosAddCircle, IoMdAddCircleOutline } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md'; 

const API_URL = "http://localhost:3000/rice-collections";

const RiceCollection = () => {
    const [name, setName] = useState('');
    const [kg, setKg] = useState('');
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from backend on mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setDataList(res.data);
        } catch (error) {
            console.error("Data fetch error:", error);
            Swal.fire("ত্রুটি", "ডাটা আনতে সমস্যা হয়েছে।", "error");
        } finally {
            setLoading(false);
        }
    };

    // Add new rice collection POST
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !kg) return;

        const newData = {
            name,
            kg: parseFloat(kg),
            date: new Date().toLocaleDateString("bn-BD"),
        };

        try {
            const res = await axios.post(API_URL, newData);
            const savedData = res.data || { ...newData, id: Date.now() };

            setDataList([savedData, ...dataList]);
            setName('');
            setKg('');
            Swal.fire({
                icon: 'success',
                title: 'সফলভাবে যুক্ত হয়েছে!',
                text: `${savedData.kg.toFixed(2)} কেজি চাল ${savedData.name} নামের জন্য যোগ করা হয়েছে।`,
                confirmButtonColor: '#14532d'
            });
        } catch (error) {
            console.error("Add error:", error);
            Swal.fire("ত্রুটি", "চাল যোগ করতে সমস্যা হয়েছে।", "error");
        }
    };

    // Delete rice collection by id (DELETE)
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "এই চালের ডাটা মুছে ফেলতে চান?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#14532d',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'হ্যাঁ, মুছে ফেলুন',
            cancelButtonText: 'না'
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataList(dataList.filter(item => item.id !== id && item._id !== id));
            Swal.fire('মুছে ফেলা হয়েছে!', 'চালটি সফলভাবে মুছে ফেলা হয়েছে।', 'success');
        } catch (error) {
            console.error("Delete error:", error);
            Swal.fire('ত্রুটি', 'চাল মুছে ফেলতে ব্যর্থ হয়েছে।', 'error');
        }
    };

    const totalKg = dataList.reduce((total, item) => total + (item.kg || 0), 0);

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
                    মোট চাল: <span className="text-xl font-bold">{totalKg?.toFixed(2)} কেজি</span>
                </div>
            </div>

            {/* Table Section */}
            <div className="mt-10">
                <h3 className="text-2xl flex gap-2 items-center font-semibold text-[#14532d] dark:text-green-400 mb-4">
                    <FaClipboardList size={22} /> চালের তালিকা
                </h3>

                {loading ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">লোড হচ্ছে...</p>
                ) : (
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
                                {dataList.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 font-semibold text-gray-500 dark:text-gray-400">
                                            এখনো কোনো চাল যোগ করা হয়নি।
                                        </td>
                                    </tr>
                                )}
                                {dataList.map((item) => (
                                    <tr key={item.id || item._id} className="hover:bg-[#d1fae5] dark:hover:bg-gray-800">
                                        <td className="px-4 py-2 text-[#14532d] dark:text-green-300">{item.date}</td>
                                        <td className="px-4 py-2 text-[#14532d] dark:text-green-300">{item.name}</td>
                                        <td className="px-4 py-2 text-[#14532d] dark:text-green-300 font-medium">
                                            {item.kg.toFixed(2)} কেজি
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(item.id || item._id)}
                                                className="btn border-[#14532d] text-[#14532d] hover:bg-[#14532d] hover:text-white"
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

export default RiceCollection;
