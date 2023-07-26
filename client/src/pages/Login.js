import React from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';

function Login() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-screen sm:w-1/2 bg-base-200 p-8 rounded-md">
        <p className="text-4xl mb-4 mr-3 inline">Sign In</p>
        <BiSolidRightArrow className="text-2xl mb-4 inline" />
        <form>
          <div className="form-control w-full mb-4">
            <div className="label">
              <div className="label-text">Email</div>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="input input-md w-full"
            />
          </div>
          <div className="form-control w-full mb-12">
            <div className="label">
              <div className="label-text">Password</div>
            </div>
            <input
              type="password"
              name="password1"
              id="password1"
              className="input input-bordered input-md w-full"
            />
          </div>
          <button type="submit" className='btn btn-block btn-primary'>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
