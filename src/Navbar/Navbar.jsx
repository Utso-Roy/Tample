import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You can log in again anytime.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out"
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
            navigate('/login');
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "bg-orange-700" : ""}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/accounts"
          className={({ isActive }) => isActive ? "bg-orange-700" : ""}
        >
          Temple History
        </NavLink>
      </li>
      
    </>
  );

  return (
    <div>
      <div className={`navbar rounded-[5px] shadow-sm text-white 
        ${theme === 'dark' ? 'bg-[#1E2939]' : 'bg-gradient-to-b from-orange-700 to-orange-600'}`}>
        
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0}
              className="menu menu-sm dropdown-content bg-gradient-to-b from-orange-700 to-orange-600 text-white rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>

          <div className='flex gap-3 items-center'>
            <img
              src="https://i.ibb.co/50j721F/temple.png"
              alt="Temple Logo"
              className="w-12 h-12 mx-auto md:mx-0 p-1 bg-white rounded-full mb-2 shadow-md"
            />
            <a className="text-2xl">
              <Typewriter
                words={['Hare Krishna', 'Hare Krishna', 'Krishna Krishna', 'Hare Hare', 'Hare Ram', 'Hare Ram', 'Ram Ram', 'Hare Hare']}
                loop={Infinity}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </a>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-semibold menu-horizontal px-1">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-4">
          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input className='toggle bg-white' type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64 17.66A9 9 0 0 1 12 3v0a9 9 0 0 0 0 18v0a9 9 0 0 1-6.36-3.34z" />
            </svg>
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 4.75a1 1 0 0 1 1 1v2.5a1 1 0 1 1-2 0v-2.5a1 1 0 0 1 1-1zm6.36 1.14a1 1 0 0 1 1.41 1.41l-1.77 1.77a1 1 0 1 1-1.41-1.41l1.77-1.77z" />
            </svg>
          </label>

          {/* User Info & Logout */}
          {
            user ? (
              <details className="dropdown dropdown-end">
                <summary
                  className="avatar cursor-pointer tooltip tooltip-bottom"
                  data-tip={user?.displayName || "User"}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={user?.photoURL || 'https://i.ibb.co/50j721F/temple.png'}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </summary>
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-56">
                  <li className="text-sm dark:text-white font-semibold text-gray-800 px-2 py-1 cursor-default">
                    {user?.displayName || "Anonymous User"}
                  </li>
                  <li className="text-sm dark:text-white text-gray-600 px-2 py-1 cursor-default">
                    {user?.email}
                  </li>
                  <li>
                    <button onClick={handleLogOut} className="btn bg-amber-500 text-white mt-1 w-full">
                      Log Out
                    </button>
                  </li>
                </ul>
              </details>
            ) : (
              <Link to="/login">
                <button className='btn'>Login</button>
              </Link>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
