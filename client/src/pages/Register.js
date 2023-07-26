import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const { email, username, password, password2 } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { email, username, password };

    console.log(newUser);
  };

  return (
    <div className="flex justify-center items-center">
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
          <button type="submit" className="btn btn-block btn-primary mb-6">
            Sign Up
          </button>
          <Link to="/login" className="hover:underline">
            Already have an account? Sign in instead!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
