import React, { useEffect, useContext } from 'react';
import SearchResults from '../components/SearchResults';
import MovieContext from '../context/movie/MovieContext';
import endpoints from '../utils/apiEndpoints';

function Home() {
  const { tvShows, movies, loading, dispatch, fetchData } =
    useContext(MovieContext);

  useEffect(() => {
    // get trending tv and movie data from tmdb api when home page loads
    const fetchTrending = async () => {
      // update api loading state to true
      dispatch({ type: 'SET_LOADING' });

      const tvShows = await fetchData(endpoints.trendingTv);
      const movies = await fetchData(endpoints.trendingMovies);

      // update state with response data from both api calls
      dispatch({
        type: 'GET_TRENDING',
        payload: {
          tvShows,
          movies,
        },
      });
    };

    // fetchTrending();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {tvShows.length >= 0 && movies.length >= 0 && (
        <section>
          <div className="my-10">
            <p className="text-4xl mb-4">Trending TV</p>
            <SearchResults />
          </div>
          <div className="my-10">
            <p className="text-4xl mb-4">Trending Movies</p>
            <SearchResults />
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
