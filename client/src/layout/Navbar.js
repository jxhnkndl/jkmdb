import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidCameraMovie } from 'react-icons/bi';
import MovieContext from '../context/movie/MovieContext';
import AuthContext from '../context/auth/AuthContext';
import { CLEAR_SEARCH } from '../context/movie/movieTypes';
import { LOGOUT } from '../context/auth/authTypes';

function Navbar() {
  const { dispatch } = useContext(MovieContext);
  const { isLoggedIn, dispatch: authDispatch } = useContext(AuthContext);

  console.log(isLoggedIn);

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
        {!isLoggedIn && (
          <li className="inline mr-6">
            <Link to="/register">Sign Up</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="inline">
            <Link to="/login">Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="inline">
            <Link to="/" onClick={() => authDispatch({ type: LOGOUT })}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
