import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { BiSolidCameraMovie } from 'react-icons/bi';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // reset to dropdown open state to false with a link is clicked so that
  // dropdown menu will close automatically
  const closeNavDrawer = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={isDropdownOpen}
        // toggle drawer open/closed status on icon click
        onChange={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      <div className="drawer-content flex flex-col">
        <nav className="navbar p-0">

          {/* brand logo */}
          <div className="flex-1">
            <Link to="/" className="flex items-center text-3xl">
              <BiSolidCameraMovie className="inline mr-1 text-primary-focus" />
              JKMDB
            </Link>
          </div>

          {/* nav links: desktop breakpoints */}
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

          {/* hamburger icon: smaller breakpoints */}
          <div className="flex-none md:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
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
          </div>
        </nav>
      </div>

      {/* sidebar: nav links in drawer on smaller breakpoints */}
      <div className="drawer-side" onClick={closeNavDrawer}>
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-100 h-full bg-base-200">
          {/* home link */}
          <li>
            <Link
              to="/"
              className="text-1xl hover:text-secondary mr-4"
              // closer drawer when link is clicked
              onClick={closeNavDrawer}
            >
              Home
            </Link>
          </li>
          {/* trending tv link */}
          <li>
            <Link
              to="/trending-tv"
              className="text-1xl hover:text-secondary mr-4"
              // closer drawer when link is clicked
              onClick={closeNavDrawer}
            >
              Trending TV
            </Link>
          </li>
          {/* trending movies link */}
          <li>
            <Link
              to="/trending-movies"
              className="text-1xl hover:text-secondary mr-4"
              // closer drawer when link is clicked
              onClick={closeNavDrawer}
            >
              Trending Movies
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
