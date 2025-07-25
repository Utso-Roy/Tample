import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaUpload } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Loading from "../Loader/Loading";

const UploadFile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const text = form.text.value;
    const date = form.date.value;
    const imageFile = form.file.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      if (imgbbRes.data.success) {
        const imageUrl = imgbbRes.data.data.url;

        const payload = {
          text,
          date,
          image: imageUrl,
        };

        await axios.post(
          "https://tample-server.vercel.app/upLoadFile",
          payload
        );
        fetchData();

        Swal.fire({
          icon: "success",
          title: "Upload Successful",
          text: "Your data has been successfully uploaded!",
          confirmButtonColor: "#3085d6",
        });

        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Image upload failed. Try again!",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: err.message || "Unknown error occurred.",
      });
    }
  };

  const fetchData = () => {
    setLoading(true);
    fetch("https://tample-server.vercel.app/upLoadFile")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("GET error", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://tample-server.vercel.app/upLoadFile/${id}`
      );
      if (res.data.success) {
        setData((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to delete the item.", "error");
      console.log(error);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="h-[calc(200vh-200px)] overflow-y-auto scroll-smooth">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 mx-auto border-2 my-5 dark:bg-gray-900 border-gray-300 dark:border-gray-700 space-y-6"
      >
        <h2 className="text-3xl justify-center font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
          <FaUpload className="text-orange-600" />
          Upload Form
        </h2>

        <input
          id="text"
          type="text"
          name="text"
          placeholder="Enter something..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />

        <input
          id="date"
          name="date"
          type="date"
          className="w-full px-4 py-2 border cursor-pointer border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />

        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border cursor-pointer border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />

        <button
          type="submit"
          className="w-full py-3 cursor-pointer bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700 transition dark:bg-orange-700 dark:hover:bg-orange-800"
        >
          Submit
        </button>
      </form>

      {/* Data Cards */}
      <div className="w-full my-10 grid md:grid-cols-3 gap-2 overflow-hidden">
        {data?.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 shadow-md"
            >
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700 text-xl"
                title="Delete"
              >
                <FaDeleteLeft size={30} />
              </button>

              <img
                onClick={() => setSelectedImage(item.image)}
                src={item.image}
                alt="Uploaded"
                className="w-full h-52 object-cover rounded-md mb-3 cursor-pointer hover:scale-105 transition"
                title="Click to view full image"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {item.text}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                📅 {item.date}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 font-semibold dark:text-gray-300">
            No data uploaded yet.
          </p>
        )}
      </div>

      {/* ✅ DaisyUI Modal for Full Image */}
      <input
        type="checkbox"
        id="image_modal"
        className="modal-toggle"
        checked={!!selectedImage}
        readOnly
      />
      {selectedImage && (
        <div className="modal  modal-open">
          <div className="modal-box ">
            <figure>
              <img
                src={selectedImage}
                alt="Full View"
                className="rounded-md w-full max-h-[50vh] object-contain"
              />
            </figure>
            <div className="modal-action">
              <label
                htmlFor="image_modal"
                onClick={() => setSelectedImage(null)}
                className="btn bg-red-500 hover:bg-red-600 text-white"
              >
                Cancel{" "}
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
