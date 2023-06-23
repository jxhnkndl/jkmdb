import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { BiSolidCameraMovie } from 'react-icons/bi';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // reset to dropdown open state to false with a link is clicked so that
  // dropdown menu will close automatically
  const toggleDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar flex justify-between items-center px-0 mb-2">
      <div className="navbar-start">
        <Link to="/" className="flex items-center text-3xl">
          <BiSolidCameraMovie className="inline mr-1 text-primary-focus" />
          JKMDB
        </Link>
      </div>
      {/* large display: expand links */}
      <div className="navbar-end">
        <div className="hidden md:flex md:items-center">
          <Link to="/" className="text-1xl hover:text-secondary mr-4">
            Home
          </Link>
          <Link
            to="/trending-tv"
            className="text-1xl hover:text-secondary mr-4"
          >
            Trending TV
          </Link>
          <Link
            to="/trending-movies"
            className="text-1xl hover:text-secondary mr-4"
          >
            Trending Movies
          </Link>
        </div>

        <FaUserAlt className="text-2xl mr-3 md:mr-0" />

        {/* small displays: collapse links into hamburger menu */}
        <div className="md:hidden dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            // toggle dropdown menu open state when icon is clicked
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          {/* dropdown menu */}
          <ul
            tabIndex={0}
            // set dropdown visibility state based on isDropdownOpen state (false = hidden, true = '')
            className={`menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box min-w-100 ${
              isDropdownOpen ? '' : 'hidden'
            }`}
          >
            {/* home link */}
            <li>
              <Link
                to="/"
                className="text-1xl hover:text-secondary mr-4"
                onClick={toggleDropdown}
              >
                Home
              </Link>
            </li>
            {/* trending tv link */}
            <li>
              <Link
                to="/trending-tv"
                className="text-1xl hover:text-secondary mr-4"
                onClick={toggleDropdown}
              >
                Trending TV
              </Link>
            </li>
            {/* trending movies link */}
            <li>
              <Link
                to="/trending-movies"
                className="text-1xl hover:text-secondary mr-4"
                onClick={toggleDropdown}
              >
                Trending Movies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
