import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
import CastCard from '../components/CastCard';
import ResultCard from '../components/ResultCard';
import MovieContext from '../context/movie/MovieContext';

import {
  formatAirDates,
  formatGenres,
  getContentRating,
  setPercentRating,
  setRatingColor,
  setContentColor,
  formatDate,
} from '../utils/helpers';

import data from '../responseData.json';

function ShowDetails() {
  const { details, loading, dispatch, searchByTitle } =
    useContext(MovieContext);

  const { mediaType, id } = useParams();
  console.log(mediaType, id);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch({ type: 'CLEAR_DETAILS' });

      const response = await searchByTitle(
        `/tv/${id}?append_to_response=aggregate_credits,recommendations,content_ratings,keywords&language=en-US`
      );

      const formattedDetails = {
        airDates: formatAirDates(
          response.first_air_date,
          response.last_air_date
        ),
        genreArr: formatGenres(response.genres),
        contentRating: getContentRating(response.content_ratings.results),
        percentRating: setPercentRating(response.vote_average),
      };

      dispatch({
        type: 'SET_DETAILS',
        payload: { ...response, ...formattedDetails },
      });
    };

    fetchDetails();
  }, []);

  return (
    <section className="my-8">
      {loading || !details ? (
        <p className="text-3xl">LOADING...</p>
      ) : (
        <div className="">
          {/* heading */}
          <div className="">
            <h1 className="text-2xl md:text-5xl font-bold mb-3">
              {details.name}
            </h1>
            <p className="text-xs md:text-sm">
              <span className="font-bold mr-3 border p-1">
                {details.contentRating}
              </span>
              TV Series ({details.airDates})
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

          {/* basic details */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
            {/* stats / details */}
            <aside className="col-span-4 md:col-span-1">
              {/* stats */}
              <div className="stats stats-vertical min-w-full bg-base-200 shadow-lg">
                {/* content rating */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">Rating</div>
                  <div
                    className={`stat-value ${setContentColor(
                      details.contentRating
                    )}`}
                  >
                    {details.contentRating}
                  </div>
                  <div className="stat-desc">For mature audiences</div>
                </div>
                {/* user rating */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">User Rating</div>
                  <div
                    className={`stat-value ${setRatingColor(
                      details.percentRating,
                      'text'
                    )}`}
                  >
                    {details.percentRating}%
                  </div>
                  <div className="stat-desc">
                    Based on {details.vote_count} votes
                  </div>
                </div>
                {/* seasons */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">Seasons</div>
                  <div className="stat-value">{details.number_of_seasons}</div>
                  <div className="stat-desc">
                    {details.number_of_episodes} total episodes
                  </div>
                </div>
              </div>
            </aside>

            {/* main */}
            <div className="col-span-4 md:col-span-2 lg:col-span-3">
              {/* genres */}
              <div className="flex flex-wrap text-[10px] sm:text-sm mb-5">
                {details.genreArr.map((genre, index) => (
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

              {/* latest episode */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">
                  Last Episode Aired
                </p>
                <BiSolidRightArrow />
              </div>
              <p className="mb-10">{formatDate(details.last_air_date)}</p>

              {/* networks */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Watch On</p>
                <BiSolidRightArrow />
              </div>
              <div className="flex items-center mb-10">
                {details.networks.map((network, index) => (
                  <div key={network.id} className="mr-4">
                    <img
                      className="max-h-10"
                      src={`https://image.tmdb.org/t/p/w154/${network.logo_path}`}
                      alt={`Watch ${details.name} on ${network.name}`}
                    />
                  </div>
                ))}
              </div>

              {/* cast */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Series Cast</p>
                <BiSolidRightArrow />
              </div>
              <div className="flex overflow-x-auto whitespace-nowrap mb-6">
                {/* render cast cards only for actors with profile photos */}
                {details.aggregate_credits.cast.map((actor, index) => {
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

export default ShowDetails;
