import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import { IoArrowBackCircleOutline } from "react-icons/io5"; // Back icon

const DokkhinPara = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ date: "", name: "", tk: "" });
  const [dataList, setDataList] = useState([]);

  // Fetch data from server
  useEffect(() => {
    axios
      .get("http://localhost:3000/dokkhin-donations")
      .then((res) => {
        setDataList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Total donation calculation
  const totalTk = (dataList || []).reduce((total, item) => total + (item.tk || 0), 0);

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      tk: parseFloat(formData.tk) || 0,
    };

    axios
      .post("http://localhost:3000/dokkhin-donations", newData)
      .then((res) => {
        const insertedDonation = { ...newData, _id: res.data.insertedId };
        setDataList([...dataList, insertedDonation]);
        Swal.fire("সফল হয়েছে", "অনুদান সফলভাবে যোগ করা হয়েছে!", "success");
        setFormData({ date: "", name: "", tk: "" });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("ত্রুটি", "অনুদান যোগ করা সম্ভব হয়নি।", "error");
      });
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "আপনি কি নিশ্চিত?",
        text: "এই অনুদানটি মুছে ফেলতে চান?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ca8a04",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
        cancelButtonText: "না",
      });

      if (confirm.isConfirmed) {
        await axios.delete(`http://localhost:3000/dokkhin-donations/${id}`);
        setDataList(dataList.filter((item) => item._id !== id));
        Swal.fire("মুছে ফেলা হয়েছে!", "অনুদানটি সফলভাবে মুছে ফেলা হয়েছে।", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("ত্রুটি", "অনুদান মুছে ফেলতে ব্যর্থ হয়েছে।", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#9d174d] cursor-pointer hover:underline"
        >
          <IoArrowBackCircleOutline className="text-2xl mr-1" />
          ফিরে যান
        </button>
      </div>

      <h1 className="text-2xl text-center text-[#9d174d] font-bold mb-4">দক্ষিণপাড়া দান তালিকা</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="border input p-2 rounded"
        />
        <input
          type="text"
          required
          placeholder="নাম"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border input p-2 rounded"
        />
        <input
          type="number"
          required
          placeholder="৳"
          value={formData.tk}
          onChange={(e) => setFormData({ ...formData, tk: e.target.value })}
          className="border input p-2 rounded"
        />
        <button
          type="submit"
          className="col-span-full cursor-pointer bg-[#9d174d] hover:bg-[#9d174d] text-white py-2 rounded "
        >
          Add Donation
        </button>
      </form>

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="border text-[#9d174d] p-2">তারিখ</th>
            <th className="border text-[#9d174d] p-2">নাম</th>
            <th className="border text-[#9d174d] p-2">টাকা</th>
            <th className="border text-[#9d174d] p-2">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {dataList?.map((item, index) => (
            <tr key={item._id || index} className="text-center">
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2 text-[#9d174d] font-bold">৳ {(item.tk ?? 0).toFixed(2)}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-[#9d174d] text-white px-3 py-1 rounded hover:bg-[#9d174de9]"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200 font-bold">
            <td colSpan="3" className="border text-[#9d174d] p-2 text-right">
              মোট
            </td>
            <td className="border p-2 text-[#9d174d]">৳ {totalTk.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DokkhinPara;
