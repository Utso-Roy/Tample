import React from "react";
import { CgMail } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#7c2d12] dark:bg-[#1E2939] text-white p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
          <aside>
            <img
              src="https://i.ibb.co/50j721F/temple.png"
              alt="Temple Logo"
              className="w-14 h-14 mx-auto md:mx-0 p-1 bg-white rounded-full mb-2 shadow-md"
            />
            <h2 className="text-xl font-bold">রামপুর আখিরা পাড়া হরি মন্দির</h2>
            <div className="mt-2 space-y-2 text-sm text-orange-100">
             <p className="flex gap-2 text-[16px] items-center"><CiLocationOn /> রামপুর, কাহারোল, দিনাজপুর   </p>
              <p className="flex text-[16px] gap-2 items-center"><MdAddCall /> 01882812787   </p> 
              <p className="flex text-[16px] gap-2 items-center"><CgMail /> Utshoroy528@gmail.com   </p>
            </div>
            <p className="mt-2 text-sm text-orange-100">
              🙏 Visiting Hours: Daily 6:00 AM - 9:00 PM
            </p>
          </aside>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-orange-100">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/contacts" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="font-bold text-lg mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookSquare size={28} className="hover:text-blue-400" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaSquareYoutube size={28} className="hover:text-red-500" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagramSquare size={28} className="hover:text-pink-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm border-t border-orange-700 pt-4 text-orange-200">
          <p>Copyright © {new Date().getFullYear()} রামপুর আখিরা পাড়া হরি মন্দির | All Rights Reserved</p>
        </div>
      </footer>

      {/* Marquee */}
      <marquee
        direction="left"
        scrollamount="6"
        className="text-lg font-semibold dark:bg-[#1E2939] text-yellow-100 bg-[#9a3412] py-2 tracking-wider"
      >
     রামপুর আখিরা পাড়া হরি মন্দির - সকলকে স্বাগতম 🙏
      </marquee>
    </div>
  );
};

export default Footer;
