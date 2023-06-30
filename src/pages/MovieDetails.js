import React from 'react';

import {
  formatAirDates,
  createGenres,
  getContentRating,
  setPercentRating,
  setRatingColor,
} from '../utils/helpers';
import data from '../responseData.json';

function MovieDetails() {
  // create air date string
  const airDates = formatAirDates(data.first_air_date, data.last_air_date);

  // format genre string
  const genres = createGenres(data.genres);

  // extract US content rating from ratings array
  const contentRating = getContentRating(data.content_ratings.results);

  // convert rating into percentage
  const rating = setPercentRating(data.vote_average);

  // set text color based on rating percentage
  const ratingColor = setRatingColor(rating, 'text');

  return (
    <section className="my-4">
      <div className="grid grid-cols-4 gap-6">
        {/* heading */}
        <div className="col-span-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">{data.name}</h1>
          <p className="text-xs md:text-sm">
            <span className="font-bold mr-3 border p-1">{contentRating}</span>
            TV Series ({airDates})
          </p>
        </div>

        {/* hero backdrop */}
        <div
          className="col-span-4 w-auto min-h-300 md:min-h-350 lg:min-h-400 bg-center lg:bg-top"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>

        {/* poster + basic info */}

        <div className="col-span-1">
          <figure>
            <img
              className="w-56"
              src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`}
              alt={`${data.name} poster`}
            />
          </figure>
        </div>

        {/* basic details */}
        <div className="col-span-3 flex flex-col justify-between md:justify-start">
          {/* genres */}
          <div className="flex flex-wrap text-[10px] sm:text-sm md:text-sm ml-2">
            {genres.map((genre) => (
              <span className="font-bold mb-2 mr-3 border p-1">{genre}</span>
            ))}
          </div>

          {/* stats */}
          <div className="stats stats-horizontal shadow-lg min-w-full">

            {/* number of seasons */}
            <div className="stat p-2">
              <div className="stat-title text-sm">Seasons</div>
              <div className="stat-value text-2xl">
                {data.number_of_seasons}
              </div>
            </div>

            {/* number of episodes */}
            <div className="stat p-2">
              <div className="stat-title text-sm">Episodes</div>
              <div className="stat-value text-2xl">
                {data.number_of_episodes}
              </div>
            </div>

            {/* user rating percentage */}
            <div className="stat p-2">
              <div className="stat-title text-sm">User Rating</div>
              <div className={`stat-value text-2xl ${ratingColor}`}>
                {rating}%
              </div>
            </div>
          </div>

          {/* overview for larger displays */}
          <div className="hidden sm:block ml-2 mt-3">
            <p className="text-2xl mb-2">Overview</p>
            <p className="text-sm md:text-1xl">{data.overview}</p>
          </div>
        </div>

        {/* overview for smaller displays */}
        <div className="col-span-4 sm:hidden">
          <p className="text-2xl mb-2">Overview</p>
          <p className="text-sm md:text-1xl">{data.overview}</p>
        </div>

        
      </div>
    </section>
  );
}

export default MovieDetails;
