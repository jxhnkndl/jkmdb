import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BiSolidRightArrow, BiCheckCircle, BiXCircle } from 'react-icons/bi';
import Loader from './Loader';
import MovieHeading from './MovieHeading';
import HeroImage from './HeroImage';
import Stat from './Stat';
import CastCard from '../components/CastCard';
import ResultCard from '../components/ResultCard';
import {
  formatGenres,
  getMpaaRating,
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
  SET_MOVIE_DETAILS,
} from '../context/movie/movieTypes';
import Auth from '../utils/auth';

function MovieDetails() {
  const [userData, setUserData] = useState({});
  const [check, setCheck] = useState(false);
  const [icon, setIcon] = useState(false);

  const { movieDetails, loading, focusId, dispatch } = useContext(MovieContext);

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

  // get movie details from tmdb api, format them, and set them into state
  useEffect(() => {
    const fetchDetails = async () => {
      dispatch({ type: SET_LOADING_TRUE });

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
        type: SET_MOVIE_DETAILS,
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
      title: movieDetails.title,
      apiRating: movieDetails.percentRating,
      posterUrl: movieDetails.poster_path,
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
      {loading || !movieDetails ? (
        <Loader />
      ) : (
        <div>
          {/* heading */}
          <MovieHeading
            title={movieDetails.title}
            contentRating={movieDetails.mpaaRating}
            releaseDate={movieDetails.releaseDate}
            runtime={movieDetails.runtime}
          />

          {/* hero backdrop */}
          <HeroImage
            backdropUrl={movieDetails.backdrop_path}
            posterUrl={movieDetails.poster_path}
            title={movieDetails.name}
          />

          {/* main content */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
            {/* stats */}
            <aside className="col-span-4 md:col-span-1">
              <div className="stats stats-vertical min-w-full bg-base-200 shadow-lg">
                {movieDetails.mpaaRating && (
                  <Stat
                    title={'Content Rating'}
                    value={movieDetails.mpaaRating}
                    textColor={setTextColor(movieDetails.mpaaRating)}
                  />
                )}
                {movieDetails.percentRating && (
                  <Stat
                    title={'User Rating'}
                    value={`${movieDetails.percentRating}%`}
                    description={`Based on ${movieDetails.vote_count} votes`}
                    textColor={setBadgeColor(
                      movieDetails.percentRating,
                      'text'
                    )}
                  />
                )}
                {movieDetails.runtime && (
                  <Stat
                    title={'Runtime'}
                    value={`${movieDetails.runtime} mins`}
                  />
                )}
              </div>
            </aside>

            {/* details */}
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
              {movieDetails.genreArr && (
                <div className="flex flex-wrap text-[10px] sm:text-sm mb-5">
                  {movieDetails.genreArr &&
                    movieDetails.genreArr.map((genre, index) => (
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
              {movieDetails.tagline && (
                <p className="text-3xl italic text-accent mb-5">
                  {movieDetails.tagline}
                </p>
              )}

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
              <p className="mb-10">{formatDate(movieDetails.release_date)}</p>

              {/* cast */}
              <div className="flex items-center mb-3">
                <p className="text-2xl font-semibold mr-2">Series Cast</p>
                <BiSolidRightArrow />
              </div>
              {movieDetails.credits && (
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
                  {!movieDetails.credits && <p>Recommendations Unavailable</p>}
                </div>
              )}

              {/* recommendations */}
              {movieDetails.recommendations &&
                movieDetails.recommendations.results.length > 1 && (
                  <div>
                    <div className="flex items-center mb-3">
                      <p className="text-2xl font-semibold mr-2">
                        More Like This
                      </p>
                      <BiSolidRightArrow />
                    </div>

                    <div className="flex overflow-x-auto whitespace-nowrap mb-10">
                      {/* render cast cards only for actors with profile photos */}
                      {movieDetails.recommendations &&
                        movieDetails.recommendations.results.map(
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
                      {!movieDetails.recommendations && (
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

export default MovieDetails;
