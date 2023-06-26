import React, { useEffect, useContext } from 'react';
import SearchResults from '../components/SearchResults';
import MovieContext from '../context/movie/MovieContext';

function Home() {
  const { tvShows, movies, loading, dispatch, fetchData } =
    useContext(MovieContext);

  useEffect(() => {
    // get trending tv and movie data from tmdb api when home page loads
    const fetchTrending = async () => {
      // update api loading state to true
      dispatch({ type: 'SET_LOADING' });

      const tvShows = await fetchData(
        `/trending/tv/day?language=en-US&pages=5`
      );
      const movies = await fetchData(
        `/trending/movie/day?language=en-US&pages=5`
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

    // fetchTrending();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-3xl">LOADING...</p>
      ) : (
        <section>
          <div className="my-10">
            <p className="text-4xl mb-4">Trending TV</p>
            <SearchResults limit={5} data={tvShows} />
          </div>
          <div className="my-10">
            <p className="text-4xl mb-4">Trending Movies</p>
            <SearchResults limit={5} data={movies} />
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
