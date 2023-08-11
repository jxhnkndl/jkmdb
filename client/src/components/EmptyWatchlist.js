import React from 'react';
import { Link } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';

function EmptyWatchlist() {
  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="text-center lg:mt-0">
        <p className="text-3xl lg:text-3xl font-bold mb-2">Your watchlist is empty!</p>
        <BiCameraMovie className="text-9xl inline mb-4" />
        <p className='text-1xl'>
          Check out {' '}
          <Link className="hover:underline text-primary" to="/trending-tv">
            Trending TV
          </Link>{' '}
          and{' '}
          <Link className="hover:underline text-primary" to="/trending-movies">
            Trending Movies
          </Link>{' '}
          for popular titles.
        </p>
      </div>
    </div>
  );
}

export default EmptyWatchlist;
