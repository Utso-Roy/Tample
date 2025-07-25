import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaClipboardList, FaRegMoneyBillAlt } from "react-icons/fa";
import { IoIosAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Loader/Loading";
const UttarPara = () => {
  const [name, setName] = useState("");
  const [tk, setTk] = useState("");
  const [dataList, setDataList] = useState([]);
  const { uttarParaTk, setUttarParaTk } = use(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://tample-server.vercel.app/uttarPara")
      .then((res) => {
        if (res.data.success) {
          setDataList(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("GET error:", err);
        Swal.fire("ত্রুটি!", "ডাটা লোড করা যায়নি।", "error");
      });
  }, []);

  //  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && tk) {
      const newData = {
        name,
        tk: parseFloat(tk),
        date: new Date().toLocaleDateString("bn-BD"),
      };

      try {
        const res = await axios.post(
          "https://tample-server.vercel.app/uttarPara",
          newData
        );

        if (res.data.success) {
          const insertedId = res.data.insertedId;
          const dataWithId = { ...newData, _id: insertedId };

          setDataList((prevList) => [dataWithId, ...prevList]);

          Swal.fire({
            icon: "success",
            title: "সফলভাবে যুক্ত হয়েছে!",
            text: `৳ ${newData.tk.toFixed(2)} অনুদান ${
              newData.name
            } নামের জন্য যোগ করা হয়েছে।`,
            confirmButtonColor: "#065f46",
          });

          setName("");
          setTk("");
        }
      } catch (error) {
        console.error("POST error:", error);
        Swal.fire({
          icon: "error",
          title: "ব্যর্থ হয়েছে!",
          text: "অনুদান যোগ করা যায়নি। সার্ভার সমস্যা হতে পারে।",
        });
      }
    }
  };

  // Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই অনুদানটি মুছে ফেলতে চান?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#065f46",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "না",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://tample-server.vercel.app/uttarPara/${id}`
          );

          if (res.data.success) {
            setDataList((prev) => prev.filter((item) => item._id !== id));
            Swal.fire(
              "মুছে ফেলা হয়েছে!",
              "অনুদানটি সফলভাবে মুছে ফেলা হয়েছে।",
              "success"
            );
          } else {
            Swal.fire("ব্যর্থ হয়েছে", "অনুদান খুঁজে পাওয়া যায়নি!", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire(
            "ত্রুটি!",
            "সার্ভার ত্রুটির কারণে মুছে ফেলা যায়নি।",
            "error"
          );
        }
      }
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  const totalTk = dataList.reduce((total, item) => total + item.tk, 0);
  setUttarParaTk(totalTk);

  return (
    <div className="max-w-4xl h-[calc(200vh-200px)] overflow-y-auto scroll-smooth mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center cursor-pointer gap-2 text-[#065f46] hover:text-green-700 font-medium"
        >
          <MdArrowBack size={22} /> পেছনে যান
        </button>
      </div>

      {/* Header */}
      <h2 className="text-3xl font-bold flex gap-2 justify-center items-center text-[#065f46] dark:text-green-300 mb-8">
        <FaRegMoneyBillAlt size={30} /> উত্তরপাড়া অনুদান ব্যবস্থাপনা
      </h2>

      {/* Form Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 rounded-xl p-6">
        <h3 className="text-2xl flex gap-2 items-center font-semibold text-[#065f46] dark:text-green-300 mb-4">
          <IoIosAddCircle size={24} /> অনুদান যোগ করুন
        </h3>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="দানকারীর নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#065f46]"
            required
          />
          <input
            type="number"
            name="tk"
            placeholder="পরিমাণ (৳)"
            value={tk}
            onChange={(e) => setTk(e.target.value)}
            className="input input-bordered w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#065f46]"
            required
          />
          <button
            type="submit"
            className="btn bg-[#065f46] text-white hover:bg-green-700 w-full flex justify-center items-center gap-2"
          >
            <IoMdAddCircleOutline size={18} /> যোগ করুন
          </button>
        </form>

        <div className="text-right mt-6 text-lg font-semibold text-[#065f46] dark:text-green-300">
          মোট অনুদান:{" "}
          <span className="text-xl font-bold">৳ {uttarParaTk.toFixed(2)}</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-10">
        <h3 className="text-2xl flex gap-2 items-center font-semibold text-[#065f46] dark:text-green-300 mb-4">
          <FaClipboardList size={22} /> অনুদানের তালিকা
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-600">
          <table className="table table-zebra w-full">
            <thead className="bg-green-200 dark:bg-gray-700 text-[#065f46] dark:text-green-300">
              <tr>
                <th className="text-left px-4 py-3">তারিখ</th>
                <th className="text-left px-4 py-3">নাম</th>
                <th className="text-left px-4 py-3">পরিমাণ (৳)</th>
                <th className="text-left px-4 py-2">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-green-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 text-[#065f46] dark:text-green-200">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 text-[#065f46] dark:text-green-200">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-[#065f46] dark:text-green-200 font-medium">
                    ৳ {item.tk.toFixed(2)}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn hover:bg-gradient-to-b from-green-500 to-[#065f46] border-[#065f46] hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {dataList.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 font-semibold text-gray-500 dark:text-gray-400"
                  >
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

export default UttarPara;
