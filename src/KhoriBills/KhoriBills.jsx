import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loading from "../Loader/Loading";

const KhoriBills = () => {
  const [formData, setFormData] = useState({ date: "", name: "", tk: "" });
  const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3000/khori-bills")
        .then((res) => {
          
setLoading(false)
            setDataList(res.data)

      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const totalTk = dataList.reduce((total, item) => total + (parseFloat(item.tk) || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      date: formData.date,
      name: formData.name,
      tk: parseFloat(formData.tk) || 0,
    };

    axios
      .post("http://localhost:3000/khori-bills", newData)
      .then((res) => {
        setDataList([...dataList, res.data]);
        Swal.fire("সফল", "খড়ি বিল যুক্ত হয়েছে!", "success");
        setFormData({ date: "", name: "", tk: "" });
      })
      .catch(() => Swal.fire("ব্যর্থ", "খড়ি বিল যোগ করা যায়নি", "error"));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই বিল মুছে ফেলবেন?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#6b7280", 
      confirmButtonText: "হ্যাঁ",
      cancelButtonText: "না",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/khori-bills/${id}`)
          .then(() => {
            setDataList(dataList.filter((item) => item._id !== id));
            Swal.fire("মুছে ফেলা হয়েছে", "", "success");
          })
          .catch(() => Swal.fire("ত্রুটি", "বিল মুছে ফেলা যায়নি", "error"));
      }
    });
    };
    
    if (loading) {
        
        return <Loading></Loading>
    }

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray-900 rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 cursor-pointer text-cyan-500 hover:text-cyan-700 dark:text-cyan-400"
      >
        <FaArrowLeft className="mr-2" />
        পিছনে যান
      </button>

      <h1 className="text-2xl text-center text-cyan-700 dark:text-cyan-400 font-bold mb-4">
        খড়ি বিল
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          required
          placeholder="নাম"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          required
          placeholder="টাকা"
          value={formData.tk}
          onChange={(e) => setFormData({ ...formData, tk: e.target.value })}
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn col-span-full bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          বিল যোগ করুন
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm border border-cyan-300 rounded">
          <thead className="bg-cyan-100 dark:bg-gray-800">
            <tr>
              <th className="border border-cyan-300 text-cyan-700 dark:text-cyan-300 px-4 py-2">তারিখ</th>
              <th className="border border-cyan-300 text-cyan-700 dark:text-cyan-300 px-4 py-2">নাম</th>
              <th className="border border-cyan-300 text-cyan-700 dark:text-cyan-300 px-4 py-2 text-right">টাকা</th>
              <th className="border border-cyan-300 text-cyan-700 dark:text-cyan-300 px-4 py-2 text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((item) => (
                <tr key={item._id} className="text-center even:bg-cyan-50 dark:even:bg-gray-700">
                  <td className="border border-cyan-300 px-4 py-2">{item.date}</td>
                  <td className="border border-cyan-300 px-4 py-2">{item.name}</td>
                  <td className="border border-cyan-300 px-4 py-2 text-cyan-600 dark:text-cyan-400 font-bold text-right">
                    ৳ {Number(item.tk).toFixed(2)}
                  </td>
                  <td className="border border-cyan-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm bg-cyan-500 text-white hover:bg-cyan-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-cyan-700 dark:text-cyan-300">
                  কোনো ডেটা নেই
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className=" dark:bg-gray-800 font-bold">
            <tr>
              <td colSpan="3" className="text-right border border-cyan-300 p-2 text-cyan-700 dark:text-cyan-300">
                মোট
              </td>
              <td className="border border-cyan-300 p-2 text-cyan-700 dark:text-cyan-300 text-right">
                ৳ {totalTk.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default KhoriBills;
