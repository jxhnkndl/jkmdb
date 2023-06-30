import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MovieContainer from '../components/MovieContainer'
import MovieContext from '../context/movie/MovieContext';

function TrendingMovies() {
  const { movies, loading } = useContext(MovieContext);

  return (
    <div>
      {loading ? (
        <p className="text-3xl">LOADING...</p>
      ) : (
        <section className="my-10">
          <div className="flex justify-between items-center">
            <p className="text-4xl mb-4">Trending Movies</p>
            <Link to="/">
              <button className="btn btn-circle btn-outline btn-sm mb-4 mr-">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
          {movies.length > 0 && <MovieContainer display={'grid'} data={movies} />}
        </section>
      )}
    </div>
  )
}

export default TrendingMovies
