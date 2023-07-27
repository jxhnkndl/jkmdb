import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidCameraMovie } from 'react-icons/bi';
import MovieContext from '../context/movie/MovieContext';
import { CLEAR_SEARCH } from '../context/movie/movieTypes';

function Navbar() {
  const { dispatch } = useContext(MovieContext);

  return (
    <nav className="flex justify-between items-center my-4">
      <div>
        <Link
          to="/"
          className="flex items-center text-3xl"
          onClick={() => dispatch({ type: CLEAR_SEARCH })}
        >
          <BiSolidCameraMovie className="inline mr-1" />
          streamo
        </Link>
      </div>

      <ul className="mt-2">
        <li className="inline mr-6">
          <Link to="/register">Sign Up</Link>
        </li>
        <li className="inline">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
