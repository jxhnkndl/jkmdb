import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
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

import details from '../responseData.json';

function MovieDetails() {
  const { loading, dispatch, searchByTitle } = useContext(MovieContext);

  const releaseDate = formatDate(details.release_date);
  const mpaaRating = getMpaaRating(details.release_dates.results);
  const percentRating = setPercentRating(details.vote_average);
  const genreArr = formatGenres(details.genres);

  return (
    <section className="my-8">
      {loading || !details ? (
        <p className="text-3xl">LOADING...</p>
      ) : (
        <div>
          {/* heading */}
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-5xl font-bold mb-3">
                {details.title}
              </h1>
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
            <p className="text-xs md:text-sm">
              <span className="font-bold mr-3 border p-1">{mpaaRating}</span>
              {releaseDate} (US) - {details.runtime} minutes
            </p>
          </div>

          {/* hero backdrop */}
          <div
            className="grid grid-cols-3 w-auto min-h-200 md:min-h-350 lg:min-h-400 bg-center lg:bg-top my-6"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            {/* poster */}
            <div className="col-span-1">
              <figure>
                <img
                  className=" w-80 "
                  src={`https://image.tmdb.org/t/p/w342/${details.poster_path}`}
                  alt={`${details.name} poster`}
                />
              </figure>
            </div>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
            {/* stats / details */}
            <aside className="col-span-4 md:col-span-1">
              {/* stats */}
              <div className="stats stats-vertical min-w-full bg-base-200 shadow-lg">
                {/* content rating */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">Rating</div>
                  <div
                    className={`stat-value ${setTextColor(
                      mpaaRating
                    )}`}
                  >
                    {mpaaRating}
                  </div>
                </div>
                {/* user rating */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">User Rating</div>
                  <div
                    className={`stat-value ${setBadgeColor(
                      percentRating,
                      'text'
                    )}`}
                  >
                    {percentRating}%
                  </div>
                  <div className="stat-desc">
                    Based on {details.vote_count} votes
                  </div>
                </div>
                {/* seasons */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">Runtime</div>
                  <div className="stat-value">{details.runtime} mins</div>
                </div>
              </div>
            </aside>

            <div className="col-span-4 md:col-span-2 lg:col-span-3">
              {/* genres */}
              <div className="flex flex-wrap text-[10px] sm:text-sm mb-5">
                {genreArr.map((genre, index) => (
                  <span key={index} className="font-bold mb-2 mr-3 border p-1">
                    {genre}
                  </span>
                ))}
              </div>

              {/* tagline */}
              <p className="text-3xl italic text-accent mb-5">
                {details.tagline}
              </p>

              {/* overview */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Overview</p>
                <BiSolidRightArrow />
              </div>
              <p className="mb-10">{details.overview}</p>

              {/* release date */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">
                  Release Date (US)
                </p>
                <BiSolidRightArrow />
              </div>
              <p className="mb-10">{formatDate(details.last_air_date)}</p>

              {/* cast */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Series Cast</p>
                <BiSolidRightArrow />
              </div>
              <div className="flex overflow-x-auto whitespace-nowrap mb-6">
                {/* render cast cards only for actors with profile photos */}
                {details.credits.cast.map((actor, index) => {
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
                {details.recommendations.results.map((result, index) => {
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
