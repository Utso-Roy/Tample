import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "সম্প্রদায়",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/addEvent", formData);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "ইভেন্ট যোগ হয়েছে!",
          text: `${formData.title} দল সফলভাবে যোগ হয়েছে।`,
        });

        // Reset form
        setFormData({
          title: "",
          description: "সম্প্রদায়",
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          image: ""
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ত্রুটি!",
          text: "দল যোগ হয়নি।",
        });
      }
    } catch (error) {
      console.error("Error posting data:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "সার্ভারের সাথে যোগাযোগ করা যায়নি।",
      });
    }
  };

  return (
      <div className="h-[calc(200vh-200px)] overflow-y-auto scroll-smooth">
          
           <div className="max-w-2xl  mx-auto p-6 bg-base-200 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">দল যোগ করুন</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="font-medium">দলের নাম</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full input input-bordered"
            placeholder="দলের নাম"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">সম্প্রদায়</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full input input-bordered"
            placeholder="সম্প্রদায়ের নাম লিখুন..."
            required
          />
        </div>

        {/* Date & Time */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="font-medium">তারিখ</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full input input-bordered"
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-medium">শুরুর সময়</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full input input-bordered"
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-medium">শেষ সময়</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full input input-bordered"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="font-medium">লোকেশন</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full input input-bordered"
            placeholder="দলের লোকেশন"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="font-medium">দলের ছবি</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full input input-bordered"
            placeholder="https://image-link.jpg"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn bg-orange-600 text-white px-10">
            যোগ করুন
          </button>
        </div>
      </form>
    </div>
   </div>
  );
};

export default AddEvent;
