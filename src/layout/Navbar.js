import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiPlayCircleFill, PiPlayCircleLight } from 'react-icons/pi';
import { BiSolidCameraMovie } from 'react-icons/bi';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // reset to dropdown open state to false with a link is clicked so that
  // dropdown menu will close automatically
  const closeNavDrawer = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="drawer drawer-end">
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
              <BiSolidCameraMovie className="inline mr-1" />
              streamo
            </Link>
          </div>

          <div className="flex-none">
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
        <div className="menu p-4 min-w-full h-full bg-gradient-to-br from-base-300 to-base-100 flex justify-center items-center">
          <ul className="text-4xl min-w-350">
            <li className="p-4">Menu</li>
            <hr className="mb-3" />
            {/* home link */}
            <li>
              <Link
                to="/"
                className="text-1xl hover:text-primary mr-4 mb-4"
                // closer drawer when link is clicked
                onClick={closeNavDrawer}
              >
                <PiPlayCircleLight className="mr-1" />
                Home
              </Link>
            </li>
            {/* trending tv link */}
            <li>
              <Link
                to="/trending-tv"
                className="text-1xl hover:text-primary mr-4 mb-4"
                // closer drawer when link is clicked
                onClick={closeNavDrawer}
              >
                <PiPlayCircleFill className="mr-1" />
                Trending TV
              </Link>
            </li>
            {/* trending movies link */}
            <li>
              <Link
                to="/trending-movies"
                className="text-1xl hover:text-primary mr-4 mb-4"
                // closer drawer when link is clicked
                onClick={closeNavDrawer}
              >
                <PiPlayCircleLight className="mr-1" />
                Trending Movies
              </Link>
            </li>
            {/* tmdb link */}
            <li>
              <a
                href="http://www.themoviedb.org"
                target="_blank"
                rel="noreferrer"
                className="text-1xl hover:text-primary mr-4 mb-4"
                // closer drawer when link is clicked
                onClick={closeNavDrawer}
              >
                <PiPlayCircleFill className="mr-1" />
                Powered by TMDB
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
