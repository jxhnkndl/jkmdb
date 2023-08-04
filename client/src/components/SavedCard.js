import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { setBadgeColor } from '../utils/helpers';
import MovieContext from '../context/movie/MovieContext';

import { SET_FOCUS_ID } from '../context/movie/movieTypes';

function ResultCard({ display, data }) {
  const { apiId, title, apiRating, posterUrl } = data;
  console.log(data);

  const { dispatch } = useContext(MovieContext);

  // update focus show/movie in global state when card is clicked
  const handleIdChange = () => {
    dispatch({
      type: SET_FOCUS_ID,
      payload: apiId,
    });
  };

  // determine color of rating badge based on rating percentage
  const ratingBadge = setBadgeColor(apiRating, 'badge');

  return (
    <div
      onClick={handleIdChange}
      className={`card flex flex-col justify-between mr-4 bg-base-200 shadow-xl mb-6 ${
        // determine card sizing based on whether display mode is grid or row
        display === 'grid' ? `w-auto lg:w-auto` : `shrink-0 w-40 lg:w-48`
      }`}
    >
      <Link to={`/${'temp'}/${apiId}`}>
        <figure onClick={handleIdChange}>
          <img
            src={`https://image.tmdb.org/t/p/w342/${posterUrl}`}
            alt={`${title} poster`}
          />
        </figure>
      </Link>
      <div className="pb-4">
        <div className="card-body py-2 px-4">
          <h2 className="text-1xl truncate">{title}</h2>
        </div>
        <div className={`badge ${ratingBadge} ml-4`}>{`${apiRating}%`}</div>
      </div>
    </div>
  );
}

export default ResultCard;
