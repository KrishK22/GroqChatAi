import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMoon, FaSun, FaUser } from 'react-icons/fa'
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';


function Navbar() {
  const DEFAULT_PROFILE_PIC = "https://ui-avatars.com/api/?background=random"
  const { authUser, logOut } = useAuthStore()
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  // console.log(authUser)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Store the theme in localStorage
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (<>
    <div className="fixed top-0 right-0 w-full z-50">
      <div className="navbar bg-base-100  flex justify-center items-center border-b  border-b-base-300  top-0  shadow backdrop-blur-md  ">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-primary" >
            GroqChat
          </Link>
        </div>
        <div className='mr-[12px] flex justify-center items-center '>

          <label className="swap swap-rotate  ">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === 'dark'}
            />
            <FaSun className="swap-on h-6 w-6 text-yellow-500 " />
            <FaMoon className="swap-off h-6 w-6 text-blue-500" />
          </label>
        </div>

        {authUser && <div className="flex-none gap-4 items-center ">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
              <div className="w-[35px] rounded-full bg-primary/20 flex items-center justify-center">
                {/* <FaUser className="text-primary text-xl" /> */}
                <img src={authUser.user.profilePic || `${DEFAULT_PROFILE_PIC}&name=${encodeURIComponent(authUser.user.fullName)}`} alt="" />
                {/* <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740" alt="" /> */}
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ">
              <li>
                <Link to='/profile' >
                  Profile
                  <span className="badge badge-primary badge-sm">New</span>

                </Link>
              </li>
              <li><Link to='/setting'>Setting</Link></li>
              <li>
                <button onClick={logOut} className="text-error hover:bg-error/10 rounded px-2 py-1">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>}
      </div>
    </div>
  </>
  )
}

export default Navbar