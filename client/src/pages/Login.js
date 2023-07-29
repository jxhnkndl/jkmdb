import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
import AuthContext from '../context/auth/AuthContext';
import { login } from '../context/auth/AuthActions';
import {
  LOGIN,
  SET_AUTH_LOADING_TRUE,
  SET_AUTH_LOADING_FALSE,
} from '../context/auth/authTypes';

function Login() {
  const [alert, setAlert] = useState({
    showAlert: false,
    msg: '',
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { dispatch } = useContext(AuthContext);

  const { email, password } = formData;
  const { showAlert } = alert;

  const navigate = useNavigate();

  const clearAlert = () => {
    setAlert({
      showAlert: false,
      msg: '',
    });
  };

  const setFormAlert = (msg) => {
    setAlert({
      showAlert: true,
      msg: msg,
    });

    setTimeout(() => clearAlert(), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setFormAlert('Please enter a valid email address');
      return;
    }

    if (!password) {
      setFormAlert('Please enter your password');
      return;
    }

    dispatch({ type: SET_AUTH_LOADING_TRUE });

    const userData = await login({ email, password });

    dispatch({
      type: LOGIN,
      payload: {
        user: userData.data.user,
        token: userData.data.token,
      },
    });

    dispatch({ type: SET_AUTH_LOADING_FALSE });

    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-screen sm:w-1/2 bg-base-200 p-8 rounded-md">
        <div className="mb-2">
          <p className="text-4xl mb-4 mr-3 inline">Sign In</p>
          <BiSolidRightArrow className="text-2xl mb-4 inline" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full mb-4">
            <div className="label">
              <div className="label-text">Email</div>
            </div>
            <input
              type="email"
              name="email"
              className="input input-md w-full"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control w-full mb-10">
            <div className="label">
              <div className="label-text">Password</div>
            </div>
            <input
              type="password"
              name="password"
              className="input input-md w-full"
              value={password}
              onChange={handleChange}
            />
          </div>

          {/* conditional alert message for invalid form entries */}
          {showAlert ? (
            <div className={`alert alert-warning mb-8 p-4`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{alert.msg}</span>
            </div>
          ) : (
            <button type="submit" className="btn btn-block btn-primary mb-6">
              Sign In
            </button>
          )}
          <Link to="/register" className="hover:underline">
            Don't have an account? Create a new one instead!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
