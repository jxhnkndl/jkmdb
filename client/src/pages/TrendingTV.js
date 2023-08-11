import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import MovieContainer from '../components/MovieContainer';
import MovieContext from '../context/movie/MovieContext';

function TrendingTV() {
  const { tvShows, loading } = useContext(MovieContext);

  return (
    <div className="flex-grow flex flex-col">
      {loading ? (
        <div className="flex-grow flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <section className="my-10">
          <div className="flex justify-between items-center">
            <p className="text-4xl mb-4">Trending TV</p>
            <Link to="/">
              <button className="btn btn-circle btn-outline btn-xs md:btn-sm mb-4 mr-">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Link>
          </div>
          {tvShows.length > 0 && (
            <MovieContainer display={'grid'} data={tvShows} />
          )}
        </section>
      )}
    </div>
  );
}

export default TrendingTV;
