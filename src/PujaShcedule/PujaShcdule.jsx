import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "../Loader/Loading";

const PujaShcdule = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tample-server.vercel.app/addEvent")
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
        setLoading(false);
      });
  }, []);
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই দল মুছে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "বাতিল",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `https://tample-server.vercel.app/addEvent/${id}`,
          {
            method: "DELETE",
          }
        );
        const result = await res.json();
        if (result.deletedCount > 0) {
          setEventData((prev) => prev.filter((item) => item._id !== id));
          Swal.fire({
            icon: "success",
            title: "ডিলিট সফল!",
            text: "দল মুছে ফেলা হয়েছে।",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire("ত্রুটি!", "ডিলিট করা যায়নি!", "error");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-orange-600 dark:text-orange-400 mb-10">
        দলের সময়সূচী
      </h2>

      {eventData.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          কোনো দল পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {eventData.map((event) => (
            <div
              key={event._id}
              className="bg-white dark:bg-[#2e3a4a] border-1 p-2 border-orange-400 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
            >
              {event.image && (
                <img
                  src={event?.image}
                  alt={event?.title}
                  className="h-48 w-full md:w-1/3 object-cover"
                />
              )}
              <div className="p-4 flex-1 relative">
                <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-300">
                  {event?.title} <span>{event?.description}</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>তারিখ :</strong> {event?.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>শুরুর সময় :</strong> {event?.startTime}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>শেষ সময় :</strong> {event?.endTime}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>লোকেশন :</strong> {event?.location}
                </p>

                <button
                  onClick={() => handleDelete(event?._id)}
                  className="absolute cursor-pointer top-2 right-2 text-red-600 hover:text-red-800 transition duration-300"
                  title="দল মুছুন"
                >
                  <MdDelete size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PujaShcdule;
