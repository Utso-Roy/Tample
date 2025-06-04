import React, { use } from 'react';
import {  Link, NavLink } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {

  const { user ,logOut} = use(AuthContext)
  const handleLogOut = () => {

    logOut()
      .then(result => {
      alert("successfully",result)
    })
      .catch(error => {
     console.log(error.message)
   })


 }





const link = (
  <>
    <li>
  <NavLink
    to="/"
    className={({ isActive }) => isActive ? "bg-orange-700 " : ""}
  >
    Home
  </NavLink>
</li>
<li>
  <NavLink
    to="/accounts"
    className={({ isActive }) => isActive ? "bg-orange-700 " : ""}
  >
    Temple History
  </NavLink>
</li>
<li>
  <NavLink
    to="/contacts"
    className={({ isActive }) => isActive ? "bg-orange-700 " : ""}
  >
    Contact
  </NavLink>
</li>

  </>
);

    return (
        <div className='my-2'>
            <div className="navbar rounded-[5px] bg-gradient-to-b from-orange-700 to-orange-600 text-white shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-gradient-to-b from-orange-700 to-orange-600 text-white rounded-box z-1 mt-3 w-52 p-2 shadow">
        {link}
      </ul>
    </div>
    <a className=" text-2xl">   <Typewriter
              words={['Hare Krishna', 'Hare Krishna', 'Krishna Krishna', 'Hare Hare', 'Hare Ram','Hare Ram','Ram Ram','Hare Hare' ]}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu font-semibold menu-horizontal px-1">
    {link}     
    </ul>
  </div>
          <div className="navbar-end gap-4">
            <input type="checkbox" value="synthwave" className="toggle r" />

            {
              
              user ?   (<details className="dropdown">
  <summary className="btn rounded-full m-1 w-12 h-12 flex items-center justify-center bg-gray-200 p-0 overflow-hidden">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqxlDun0EWp8OiGTXoelcBkuM7BiifKAflkw&s"
      alt="profile"
      className="w-full h-full object-cover rounded-full"
    />
  </summary>

  <ul className="menu dropdown-content bg-amber-200 gap-1 rounded-box z-10 w-52 p-2 shadow-sm">
    <li className='btn'>{user?.email}</li>
    <button onClick={handleLogOut} className='btn'>LogOut</button>
  </ul>
</details>

) :   (  <Link to="/login" > <button className='btn'>Login </button></Link>)

}
            

  </div>
</div>
        </div>
    );
};

export default Navbar;