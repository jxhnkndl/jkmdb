import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
import MovieContainer from '../components/MovieContainer';
import MovieContext from '../context/movie/MovieContext';
import { formatSearchTerm } from '../utils/helpers';

function Home() {
  const {
    tvShows,
    movies,
    searchResults,
    searchTerm,
    loading,
    dispatch,
    fetchTrending,
  } = useContext(MovieContext);

  useEffect(() => {
    // get trending tv and movie data from tmdb api when home page loads
    const initMovieState = async () => {
      // update api loading state to true
      dispatch({ type: 'SET_LOADING' });

      const tvShows = await fetchTrending(`/trending/tv/day?language=en-US`);
      const movies = await fetchTrending(`/trending/movie/day?language=en-US`);

      // update state with response data from both api calls
      dispatch({
        type: 'GET_TRENDING',
        payload: {
          tvShows,
          movies,
        },
      });
    };

    initMovieState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-3xl">LOADING...</p>
      ) : (
        <section>
          {/* only display the first row of trending tv results
              on the home page where tvShows results are in state 
              and there are no search results to show */}
          {tvShows.length > 0 && searchResults.length === 0 && (
            <div className="my-10">
              <Link to="/trending-tv" className="hover:text-primary">
                <p className="text-4xl mb-4 mr-3 inline">Trending TV</p>
                <BiSolidRightArrow className="text-3xl mb-4 inline" />
              </Link>
              <MovieContainer display={'row'} limit={10} data={tvShows} />
            </div>
          )}

          {/* only display the second row of trending movies on the
              home page where movie reuslts are in state and there 
              are no search results to show */}
          {movies.length > 0 && searchResults.length === 0 && (
            <div className="my-10">
              <Link to="/trending-movies" className="hover:text-primary">
                <p className="text-4xl mb-4 mr-3 inline">Trending Movies</p>
                <BiSolidRightArrow className="text-3xl mb-4 inline" />
              </Link>
              <MovieContainer display={'row'} limit={10} data={movies} />
            </div>
          )}

          {/* otherwise display single search results container
              containing results from user search */}
          {searchResults.length > 0 && (
            <div className="my-10">
              <div className="flex justify-between items-center">
                <p className="text-4xl mb-4">{formatSearchTerm(searchTerm)}</p>
                <Link to="/">
                  <button
                    className="btn btn-circle btn-outline btn-xs md:btn-sm mb-4 mr-"
                    onClick={() => dispatch({ type: 'CLEAR_SEARCH' })}
                  >
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
              <MovieContainer display={'grid'} data={searchResults} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Home;
