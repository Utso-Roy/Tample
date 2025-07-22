import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loading from "../Loader/Loading";

const ProsadBills = () => {
  const [formData, setFormData] = useState({ date: "", name: "", tk: "" });
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/prosad-bills")
      .then((res) => {
        setDataList(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalTk = (dataList || []).reduce(
    (total, item) => total + (item.tk || 0),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      tk: parseFloat(formData.tk) || 0,
    };

    axios
      .post("http://localhost:3000/prosad-bills", newData)
      .then((res) => {
        const inserted = { ...newData, _id: res.data.insertedId };
        setDataList([...dataList, inserted]);
        Swal.fire("সফল", "প্রসাদ বিল যুক্ত হয়েছে!", "success");
        setFormData({ date: "", name: "", tk: "" });
      })
      .catch(() =>
        Swal.fire("ব্যর্থ", "প্রসাদ বিল যোগ করা যায়নি", "error")
      );
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই প্রসাদ বিল মুছে ফেলবেন?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ",
      cancelButtonText: "না",
    });

    if (confirm.isConfirmed) {
      axios
        .delete(`http://localhost:3000/prosad-bills/${id}`)
        .then(() => {
          setDataList(dataList.filter((item) => item._id !== id));
          Swal.fire("মুছে ফেলা হয়েছে", "", "success");
        })
        .catch(() =>
          Swal.fire("ত্রুটি", "প্রসাদ বিল মুছে ফেলা যায়নি", "error")
        );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray-900 rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 cursor-pointer text-purple-500 hover:text-purple-800 dark:text-purple-400"
      >
        <FaArrowLeft className="mr-2" />
        পিছনে যান
      </button>

      <h1 className="text-2xl text-center text-purple-700 dark:text-purple-400 font-bold mb-4">
        প্রসাদ বিল
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
          className="btn col-span-full bg-purple-500 hover:bg-purple-600 text-white"
        >
          প্রসাদ বিল যোগ করুন
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm border">
          <thead className="bg-purple-100 dark:bg-gray-800">
            <tr>
              <th className="border text-purple-700 dark:text-purple-300">তারিখ</th>
              <th className="border text-purple-700 dark:text-purple-300">নাম</th>
              <th className="border text-purple-700 dark:text-purple-300">টাকা</th>
              <th className="border text-purple-700 dark:text-purple-300">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-purple-600 dark:text-purple-400 font-bold">
                  ৳ {(item.tk ?? 0).toFixed(2)}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm bg-purple-500 text-white hover:bg-purple-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-purple-100 dark:bg-gray-800 font-bold">
            <tr>
              <td colSpan="3" className="text-right border p-2 text-purple-700 dark:text-purple-300">
                মোট
              </td>
              <td className="border p-2 text-purple-700 dark:text-purple-300">
                ৳ {totalTk.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProsadBills;
