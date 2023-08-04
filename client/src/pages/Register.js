import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
import Auth from '../utils/auth';

function Register() {
  const [alert, setAlert] = useState({
    showAlert: false,
    msg: '',
  });

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const { email, username, password, password2 } = formData;
  const { showAlert } = alert;

  const emailInput = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const password2Input = useRef(null);

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

    if (!username) {
      setFormAlert('Please choose a username');
      return;
    }

    if (password.length < 8 || password.length > 24) {
      setFormAlert('Choose a password between 8 and 24 characters');
      return;
    }

    if (password !== password2) {
      setFormAlert('Password do not match');
      return;
    }

    try {
      await Auth.registerUser({ email, username, password });

      navigate(-1);
    } catch (err) {
      setFormAlert('Something went wrong!');

      // reset focus on email input
      emailInput.current.focus();
      usernameInput.current.blur();
      passwordInput.current.blur();
      password2Input.current.blur();

      setFormData({
        email: '',
        username: '',
        password: '',
        password2: ''
      });

      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <div className="w-screen sm:w-1/2 bg-base-200 p-8 rounded-md">
        <div className="mb-2">
          <p className="text-4xl mb-4 mr-3 inline">Create Account</p>
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
          <div className="form-control w-full mb-4">
            <div className="label">
              <div className="label-text">Username</div>
            </div>
            <input
              type="text"
              name="username"
              className="input input-md w-full"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control w-full mb-4">
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
          <div className="form-control w-full mb-10">
            <div className="label">
              <div className="label-text">Confirm Password</div>
            </div>
            <input
              type="password"
              name="password2"
              className="input input-md w-full"
              value={password2}
              onChange={handleChange}
            />
          </div>

          {/* conditional alert message for invalid form entries */}
          {showAlert ? (
            <div className={`alert alert-warning mb-6 p-3`}>
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
              Sign Up
            </button>
          )}

          <Link to="/login" className="hover:underline">
            Already have an account? Sign in instead!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
