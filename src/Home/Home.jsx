import React from 'react';
import { Link, useLoaderData } from 'react-router';

const Home = () => {
  const data = useLoaderData();

  return (
    <div className="grid grid-cols-3 min-h-screen gap-3 p-3 bg-base-200 text-base-content  h-[calc(100vh-100px)] overflow-y-auto">
      {data.map((singleData, index) => (
        <div key={index} className="card bg-base-100 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={singleData.image || "https://via.placeholder.com/150"}
              alt={singleData.name}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{singleData.name}</h2>
            <p className="text-orange-700 font-semibold">পদবী: {singleData.position}</p>
            <div className="card-actions mt-4">
              <Link to={`/detailsPage/${singleData.id}`}>
                <button className="btn btn-sm hover:bg-[#e44100] hover:text-white border border-[#e44100]">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
