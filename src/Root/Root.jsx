import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';  
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/Sidebar';

const Root = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      <div className='sticky top-0 z-1000 '>

      <Navbar />
      </div>
      <div className="flex">
      <div><Sidebar />  </div>
        <div className=" w-full  flex flex-col">
          <main className="flex-grow ">
            <Outlet />
          </main>
        </div>
      </div>
      <div >
         <Footer />
         </div>
    </div>
  );
};

export default Root;
