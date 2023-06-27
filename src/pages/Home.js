import React, { useState, useEffect, useContext } from 'react';
import SearchResults from '../components/SearchResults';
import MovieContext from '../context/movie/MovieContext';

function Home() {
  const [display, setDisplay] = useState('trending');

  const {
    tvShows,
    movies,
    searchResults,
    searchTerm,
    loading,
    dispatch,
    fetchData,
  } = useContext(MovieContext);

  useEffect(() => {
    if (display === 'trending') {
      // get trending tv and movie data from tmdb api when home page loads
      const fetchTrending = async () => {
        // update api loading state to true
        dispatch({ type: 'SET_LOADING' });

        const tvShows = await fetchData(
          `/trending/tv/day?language=en-US&page=1`
        );
        const movies = await fetchData(
          `/trending/movie/day?language=en-US&page=1`
        );

        // update state with response data from both api calls
        dispatch({
          type: 'GET_TRENDING',
          payload: {
            tvShows,
            movies,
          },
        });
      };

      fetchTrending();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // clear search data and reset page to default trending data
  const handleClear = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
    setDisplay('trending');
  };

  // split search term into array, map through words, convert first letter
  // of each word to uppercase for display, reattach to rest of the word
  const formatSearchTerm = () => {
    return searchTerm
      .split(' ')
      .map((term) => term.charAt(0).toUpperCase() + term.slice(1))
      .join(' ');
  };

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
              <p className="text-4xl mb-4">Trending TV</p>
              <SearchResults limit={5} data={tvShows} />
            </div>
          )}

          {/* only display the second row of trending movies on the
              home page where movie reuslts are in state and there 
              are no search results to show */}
          {movies.length > 0 && searchResults.length === 0 && (
            <div className="my-10">
              <p className="text-4xl mb-4">Trending Movies</p>
              <SearchResults limit={5} data={movies} />
            </div>
          )}

          {/* otherwise display single search results container
              containing results from user search */}
          {searchResults.length > 0 && (
            <div className="my-10">
              <div className="flex justify-between items-center">
                <p className="text-4xl mb-4">{formatSearchTerm()}</p>
                <button
                  className="btn btn-circle btn-outline btn-sm mb-4 mr-4 md:max-lg:mr-16"
                  onClick={handleClear}
                >
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
              </div>
              <SearchResults data={searchResults} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Home;
