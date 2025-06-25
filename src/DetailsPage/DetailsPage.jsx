import React from 'react';
import {  Link, useLoaderData, useParams } from 'react-router';

const DetailsPage = () => {

    const data = useParams()
    const loaderData = useLoaderData()
    const findData = loaderData.find(singleData => singleData.id == data.id)
    
    const {image,responsibility,email,phone,position,name}= findData




    return (
        <div className="hero h-full bg-[#f3f4f6]">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 p-6">
        <img
          src={image}
          alt={name}
          className="max-w-sm rounded-lg shadow-2xl border-4 border-orange-300"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-orange-800">{name}</h1>
          <p className="text-lg mt-2 text-gray-700 font-semibold">পদবী: {position}</p>
          <p className="py-2 text-gray-600">{responsibility}</p>

          <div className="mt-2 space-y-2">
            <p><strong>Email:</strong> <a href='#' className="text-blue-600">{email}</a></p>
            <p><strong>Phone:</strong> <a href='#' className="text-blue-600">{phone}</a></p>
          </div>
<Link to="/"><button className="mt-6 btn btn-sm  bg-orange-700 hover:bg-orange-700 text-white">Back to Home</button>
</Link>
        </div>
      </div>
    </div>
    );
};

export default DetailsPage;