import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BiSolidRightArrow, BiCheckCircle, BiXCircle } from 'react-icons/bi';
import Loader from './Loader';
import HeroImage from './HeroImage';
import CastCard from '../components/CastCard';
import ResultCard from '../components/ResultCard';
import {
  formatAirDates,
  formatGenres,
  getContentRating,
  setPercentRating,
  setBadgeColor,
  setTextColor,
  formatDate,
} from '../utils/helpers';
import MovieContext from '../context/movie/MovieContext';
import {
  searchByTitle,
  saveMovie,
  deleteMovie,
} from '../context/movie/MovieActions';
import {
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  SET_SHOW_DETAILS,
} from '../context/movie/movieTypes';
import Auth from '../utils/auth';

function ShowDetails() {
  const [userData, setUserData] = useState({});
  const [check, setCheck] = useState(false);
  const [icon, setIcon] = useState(false);

  const { showDetails, loading, focusId, dispatch } = useContext(MovieContext);

  const { id } = useParams();

  // get current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!Auth.isLoggedIn()) {
        console.log('User not logged in');
        return;
      }

      try {
        const response = await Auth.getMe();

        setUserData(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []);

  // get show details from tmdb api, format them, and set them into state
  useEffect(() => {
    const fetchDetails = async () => {
      dispatch({ type: SET_LOADING_TRUE });

      const response = await searchByTitle(
        `/tv/${id}?append_to_response=aggregate_credits,recommendations,content_ratings,keywords&language=en-US`
      );

      const formattedDetails = {
        airDates: formatAirDates(
          response.first_air_date,
          response.last_air_date
        ),
        genreArr: formatGenres(response.genres),
        contentRating: getContentRating(
          response.content_ratings.results || 'Unknown'
        ),
        percentRating: setPercentRating(response.vote_average),
      };

      dispatch({
        type: SET_SHOW_DETAILS,
        payload: { ...response, ...formattedDetails },
      });

      // delay setting loading to false briefly to smooth the transition
      // and ensure all content renders at the same time
      setTimeout(() => dispatch({ type: SET_LOADING_FALSE }), 750);
    };

    fetchDetails();
  }, [focusId]);

  const handleSave = async () => {
    const movie = {
      apiId: id,
      title: showDetails.name,
      apiRating: showDetails.percentRating,
      posterUrl: showDetails.poster_path,
    };

    try {
      await saveMovie(movie);
      setCheck(true);
      setTimeout(() => setCheck(false), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMovie(id);
      setIcon(true);
      setTimeout(() => setIcon(false), 3000);
    } catch (err) {
      console.table(err);
    }
  };

  return (
    <section className="my-8">
      {loading || !showDetails ? (
        <Loader />
      ) : (
        <div>
          {/* heading */}
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-5xl font-bold mb-3">
                {showDetails.name}
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
            {showDetails.contentRating && (
              <p className="text-xs md:text-sm">
                <span className="font-bold mr-3 border p-1">
                  {showDetails.contentRating}
                </span>
                TV Series ({showDetails.airDates})
              </p>
            )}
          </div>

          {/* hero backdrop */}
          <HeroImage
            backdropUrl={showDetails.backdrop_path}
            posterUrl={showDetails.poster_path}
            title={showDetails.name}
          />

          {/* main content */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
            {/* stats */}
            <aside className="col-span-4 md:col-span-1">
              <div className="stats stats-vertical min-w-full bg-base-200 shadow-lg">
                {/* content rating */}
                {showDetails.contentRating && (
                  <div className="stat text-center md:text-left">
                    <div className="stat-title">Rating</div>
                    <div
                      className={`stat-value ${setTextColor(
                        showDetails.contentRating
                      )}`}
                    >
                      {showDetails.contentRating}
                    </div>
                    <div className="stat-desc">For mature audiences</div>
                  </div>
                )}

                {/* user rating */}
                <div className="stat text-center md:text-left">
                  <div className="stat-title">User Rating</div>
                  <div
                    className={`stat-value ${setBadgeColor(
                      showDetails.percentRating,
                      'text'
                    )}`}
                  >
                    {showDetails.percentRating}%
                  </div>
                  <div className="stat-desc">
                    Based on {showDetails.vote_count} votes
                  </div>
                </div>

                {/* seasons */}
                {showDetails.number_of_seasons && (
                  <div className="stat text-center md:text-left">
                    <div className="stat-title">Seasons</div>
                    <div className="stat-value">
                      {showDetails.number_of_seasons}
                    </div>
                    <div className="stat-desc">
                      {showDetails.number_of_episodes} total episodes
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* main content */}
            <div className="col-span-4 md:col-span-2 lg:col-span-3">
              {/* watchlist buttons */}
              {Auth.isLoggedIn() && (
                <div className="grid grid-cols-3 gap-x-4 mb-7">
                  <div className="col-span-3 md:col-span-1">
                    <button
                      className={`btn ${
                        check ? 'btn-success' : 'btn-accent'
                      } btn-block mb-5 shadow`}
                      onClick={handleSave}
                    >
                      Add to Watchlist
                      {check && (
                        <BiCheckCircle className="text-2xl inline ml-1" />
                      )}
                    </button>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <button
                      className={`btn btn-block ${
                        icon && 'btn-error'
                      } shadow px-4`}
                      onClick={handleDelete}
                    >
                      Remove
                      {icon && <BiXCircle className="text-2xl inline ml-1" />}
                    </button>
                  </div>
                </div>
              )}

              {/* genres */}
              {showDetails.genreArr && (
                <div className="flex flex-wrap text-[10px] sm:text-sm mb-5">
                  {showDetails.genreArr &&
                    showDetails.genreArr.map((genre, index) => (
                      <span
                        key={index}
                        className="font-bold mb-2 mr-3 border p-2"
                      >
                        {genre}
                      </span>
                    ))}
                </div>
              )}

              {/* tagline */}
              {showDetails.tagline && (
                <p className="text-3xl italic text-accent mb-5">
                  {showDetails.tagline}
                </p>
              )}

              {/* overview */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Overview</p>
                <BiSolidRightArrow />
              </div>
              <p className="mb-10">{showDetails.overview}</p>

              {/* latest episode */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">
                  Last Episode Aired
                </p>
                <BiSolidRightArrow />
              </div>
              <p className="mb-10">{formatDate(showDetails.last_air_date)}</p>

              {/* networks */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Watch On</p>
                <BiSolidRightArrow />
              </div>
              <div className="flex items-center mb-10">
                {showDetails.networks &&
                  showDetails.networks.map((network, index) => (
                    <div key={network.id} className="mr-4">
                      <img
                        className="max-h-10"
                        src={`https://image.tmdb.org/t/p/w154/${network.logo_path}`}
                        alt={`Watch ${showDetails.name} on ${network.name}`}
                      />
                    </div>
                  ))}
                {!showDetails.networks && <p>Networks Unavailable</p>}
              </div>

              {/* cast */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Series Cast</p>
                <BiSolidRightArrow />
              </div>
              <div className="flex overflow-x-auto whitespace-nowrap mb-6">
                {/* render cast cards only for actors with profile photos */}
                {showDetails.aggregate_credits &&
                  showDetails.aggregate_credits.cast.map((actor, index) => {
                    if (actor.profile_path) {
                      return (
                        <CastCard key={`${index}-${actor.id}`} data={actor} />
                      );
                    }
                  })}
                {!showDetails.aggregate_credits && (
                  <p className="mb-10">Cast Details Unavailable</p>
                )}
              </div>

              {/* recommendations */}
              {showDetails.recommendations &&
                showDetails.recommendations.results.length > 1 && (
                  <div>
                    <div className="flex items-center mb-3">
                      <p className="text-2xl font-semibold mr-2">
                        More Like This
                      </p>
                      <BiSolidRightArrow />
                    </div>
                    <div className="flex overflow-x-auto whitespace-nowrap mb-10">
                      {/* render cast cards only for actors with profile photos */}
                      {showDetails.recommendations &&
                        showDetails.recommendations.results.map(
                          (result, index) => {
                            if (result.poster_path) {
                              return (
                                <ResultCard
                                  key={`${index}-${result.id}`}
                                  data={result}
                                  display={'row'}
                                />
                              );
                            }
                          }
                        )}
                      {!showDetails.recommendations && (
                        <p>Recommendations Unavailable</p>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ShowDetails;
