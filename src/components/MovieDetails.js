import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
import Loader from './Loader';
import CastCard from '../components/CastCard';
import ResultCard from '../components/ResultCard';
import MovieContext from '../context/movie/MovieContext';

import {
  formatGenres,
  getMpaaRating,
  setPercentRating,
  setBadgeColor,
  setTextColor,
  formatDate,
} from '../utils/helpers';

function MovieDetails() {
  const { movieDetails, focusId, loading, dispatch, searchByTitle } =
    useContext(MovieContext);

  const { mediaType, id } = useParams();
  console.log(mediaType, id);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch({ type: 'SET_LOADING_TRUE' });

      const response = await searchByTitle(
        `/movie/${id}?append_to_response=credits,recommendations,release_dates,keywords&language=en-US`
      );

      const formattedDetails = {
        releaseDate: formatDate(response.release_date),
        mpaaRating: getMpaaRating(response.release_dates.results),
        genreArr: formatGenres(response.genres),
        percentRating: setPercentRating(response.vote_average),
      };

      dispatch({
        type: 'SET_MOVIE_DETAILS',
        payload: { ...response, ...formattedDetails },
      });

      // delay setting loading to false briefly to smooth the transition
      // and ensure all content renders at the same time
      setTimeout(() => dispatch({ type: 'SET_LOADING_FALSE' }), 750);
    };

    fetchDetails();

    // update component details when title selection changes
  }, [focusId]);

  return (
    <section className="my-8">
      {loading || !movieDetails ? (
        <Loader />
      ) : (
        <div>
          {/* heading */}
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-5xl font-bold mb-3">
                {movieDetails.title}
              </h1>
              <Link to="/">
                <button className="btn btn-circle btn-outline btn-xs md:btn-sm mb-4">
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
            <p className="text-xs md:text-sm">
              <span className="font-bold mr-3 border p-1">
                {movieDetails.mpaaRating}
              </span>
              {movieDetails.releaseDate} (US) - {movieDetails.runtime} minutes
            </p>
          </div>

          {/* hero backdrop */}
          <div
            className="grid grid-cols-3 w-auto min-h-200 md:min-h-350 lg:min-h-400 bg-center lg:bg-top my-6"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            {/* poster */}
            <div className="col-span-1">
              <figure>
                <img
                  className="w-72 m-4 border-4 border-base-300 shadow-2xl shadow-base-300"
                  src={`https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`}
                  alt={`${movieDetails.name} poster`}
                />
              </figure>
            </div>
          </div>

          {/* main content */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
            {/* stats */}
            <aside className="col-span-4 md:col-span-1">
              <div className="stats stats-vertical min-w-full bg-base-200 shadow-lg">
                {/* MPAA rating */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">Rating</div>
                  <div
                    className={`stat-value ${setTextColor(
                      movieDetails.mpaaRating
                    )}`}
                  >
                    {movieDetails.mpaaRating}
                  </div>
                </div>

                {/* user rating */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">User Rating</div>
                  <div
                    className={`stat-value ${setBadgeColor(
                      movieDetails.percentRating,
                      'text'
                    )}`}
                  >
                    {movieDetails.percentRating}%
                  </div>
                  <div className="stat-desc">
                    Based on {movieDetails.vote_count} votes
                  </div>
                </div>

                {/* runtime */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">Runtime</div>
                  <div className="stat-value">{movieDetails.runtime} mins</div>
                </div>
              </div>
            </aside>

            {/* details */}
            <div className="col-span-4 md:col-span-2 lg:col-span-3">
              {/* genres */}
              <div className="flex flex-wrap text-[10px] sm:text-sm mb-5">
                {movieDetails.genreArr &&
                  movieDetails.genreArr.map((genre, index) => (
                    <span
                      key={index}
                      className="font-bold mb-2 mr-3 border p-1"
                    >
                      {genre}
                    </span>
                  ))}
              </div>

              {/* tagline */}
              <p className="text-3xl italic text-accent mb-5">
                {movieDetails.tagline}
              </p>

              {/* overview */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Overview</p>
                <BiSolidRightArrow />
              </div>
              <p className="mb-10">{movieDetails.overview}</p>

              {/* release date */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Release Date (US)</p>
                <BiSolidRightArrow />
              </div>
              <p className="mb-10">{formatDate(movieDetails.last_air_date)}</p>

              {/* cast */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Series Cast</p>
                <BiSolidRightArrow />
              </div>
              <div className="flex overflow-x-auto whitespace-nowrap mb-6">
                {/* render cast cards only for actors with profile photos */}
                {movieDetails.credits &&
                  movieDetails.credits.cast.map((actor, index) => {
                    if (actor.profile_path) {
                      return (
                        <CastCard key={`${index}-${actor.id}`} data={actor} />
                      );
                    }
                  })}
              </div>

              {/* recommendations */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">More Like This</p>
                <BiSolidRightArrow />
              </div>
              <div className="flex overflow-x-auto whitespace-nowrap mb-10">
                {/* render cast cards only for actors with profile photos */}
                {movieDetails.recommendations &&
                  movieDetails.recommendations.results.map((result, index) => {
                    if (result.poster_path) {
                      return (
                        <ResultCard
                          key={`${index}-${result.id}`}
                          data={result}
                          display={'row'}
                        />
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MovieDetails;
