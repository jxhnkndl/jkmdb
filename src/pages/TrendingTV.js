import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from '../components/SearchResults';
import MovieContext from '../context/movie/MovieContext';

function TrendingTV() {
  const { tvShows, loading, dispatch, fetchData } = useContext(MovieContext);

  useEffect(() => {
    const fetchTrendingTv = async () => {
      // update api loading state to true
      dispatch({ type: 'SET_LOADING' });

      const totalPages = 5;
      let allTrendingTv = [];

      // request 5 pages worth of trending tv results (total 100 titles)
      for (let page = 1; page <= totalPages; page++) {
        const response = await fetchData(
          `/trending/tv/day?language=en-US&page=${page}`
        );

        allTrendingTv = [...allTrendingTv, ...response];
      }

      // update trending tv state with concatenated results
      dispatch({
        type: 'GET_TRENDING_TV',
        payload: allTrendingTv
      })
    };

    // fetchTrendingTv();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-3xl">LOADING...</p>
      ) : (
        <section className="my-10">
          <div className="flex justify-between items-center">
            <p className="text-4xl mb-4">Trending TV</p>
            <Link to="/">
              <button className="btn btn-circle btn-outline btn-sm mb-4 mr-4 md:max-lg:mr-16">
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
          {tvShows.length > 0 && <SearchResults data={tvShows} />}
        </section>
      )}
    </div>
  );
}

export default TrendingTV;
