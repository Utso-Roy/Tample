import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaClipboardList, FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoIosAddCircle, IoMdAddCircleOutline } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md';

const OutCollection = () => {
    const [name, setName] = useState('');
    const [tk, setTk] = useState('');
    const [dataList, setDataList] = useState([]);
    const API_URL = 'http://localhost:3000/out-collections'; 

    // Fetch all donations on component mount
    useEffect(() => {
        axios.get(API_URL)
            .then(res => setDataList(res.data))
            .catch(() => Swal.fire('Error',  'error'));
    }, []);

    //  Add new donation
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name && tk) {
            const newData = {
                name,
                tk: parseFloat(tk),
                date: new Date().toLocaleDateString("bn-BD")
            };
            try {
                const res = await axios.post(API_URL, newData);
                setDataList([res.data, ...dataList]);
                setName('');
                setTk('');
                Swal.fire({
                    icon: 'success',
                    title: 'সফলভাবে যুক্ত হয়েছে!',
                    text: `৳ ${res.data.tk.toFixed(2)} অনুদান ${res.data.name} নামের জন্য যোগ করা হয়েছে।`,
                    confirmButtonColor: '#7f1d1d'
                });
            } catch (err) {
                Swal.fire('Error', 'ডাটা যোগ করতে সমস্যা হয়েছে', 'error');
            }
        }
    };

    // ✅ Delete donation by ID
    const handleDelete = (id) => {
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "এই অনুদানটি মুছে ফেলতে চান?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7f1d1d',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'হ্যাঁ, মুছে ফেলুন',
            cancelButtonText: 'না'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}/${id}`);
                    setDataList(dataList.filter(item => item._id !== id));
                    Swal.fire('মুছে ফেলা হয়েছে!', 'অনুদানটি সফলভাবে মুছে ফেলা হয়েছে।', 'success');
                } catch (err) {
                    Swal.fire('Error', 'ডাটা মুছে ফেলতে সমস্যা হয়েছে', 'error');
                }
            }
        });
    };

    const totalTk = dataList.reduce((total, item) => total + parseFloat(item.tk || 0), 0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
            {/* Back Button */}
            <div className="mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center cursor-pointer gap-2 text-[#7f1d1d] hover:text-red-700 font-medium"
                >
                    <MdArrowBack size={22} /> পেছনে যান
                </button>
            </div>

            {/* Header */}
            <h2 className="text-3xl font-bold flex gap-2 justify-center items-center text-[#7f1d1d] dark:text-red-400 mb-8">
                <FaRegMoneyBillAlt size={30} /> বাইরের অনুদান ব্যবস্থাপনা
            </h2>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 rounded-xl p-6">
                <h3 className="text-2xl flex gap-2 items-center font-semibold text-[#7f1d1d] dark:text-red-400 mb-4">
                    <IoIosAddCircle size={24} /> অনুদান যোগ করুন
                </h3>
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="দানকারীর নাম"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]"
                        required
                    />
                    <input
                        type="number"
                        placeholder="পরিমাণ (৳)"
                        value={tk}
                        onChange={(e) => setTk(e.target.value)}
                        className="input input-bordered w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]"
                        required
                    />
                    <button
                        type="submit"
                        className="btn bg-[#7f1d1d] text-white hover:bg-red-800 w-full flex justify-center items-center gap-2"
                    >
                        <IoMdAddCircleOutline size={18} /> যোগ করুন
                    </button>
                </form>

                <div className="text-right mt-6 text-lg font-semibold text-[#7f1d1d] dark:text-red-400">
                    মোট অনুদান: <span className="text-xl font-bold">৳ {totalTk.toFixed(2)}</span>
                </div>
            </div>

            {/* Table */}
            <div className="mt-10">
                <h3 className="text-2xl flex gap-2 items-center font-semibold text-[#7f1d1d] dark:text-red-400 mb-4">
                    <FaClipboardList size={22} /> অনুদানের তালিকা
                </h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600">
                    <table className="table table-zebra w-full">
                        <thead className="bg-[#fef2f2] dark:bg-gray-700 text-[#7f1d1d] dark:text-red-400">
                            <tr>
                                <th className="text-left px-4 py-3">তারিখ</th>
                                <th className="text-left px-4 py-3">নাম</th>
                                <th className="text-left px-4 py-3">পরিমাণ (৳)</th>
                                <th className="text-left px-4 py-3">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((item) => (
                                <tr key={item._id}>
                                    <td className="px-4 py-2">{item.date}</td>
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2 font-medium">৳ {parseFloat(item.tk).toFixed(2)}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn border-[#7f1d1d] text-[#7f1d1d] hover:bg-[#7f1d1d] hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {dataList.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 font-semibold text-gray-500 dark:text-gray-400">
                                        এখনো কোনো অনুদান যোগ করা হয়নি।
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

export default OutCollection;
