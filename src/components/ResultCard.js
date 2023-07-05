import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { setPercentRating, setBadgeColor } from '../utils/helpers';
import MovieContext from '../context/movie/MovieContext';

function ResultCard({ display, data }) {
  const { id, media_type, poster_path, name, title, vote_average } = data;

  const { focusId, dispatch } = useContext(MovieContext);

  // update focus show/movie in global state when card is clicked
  const handleIdChange = () => {
    dispatch({
      type: 'SET_FOCUS_ID',
      payload: id,
    });
  };

  // convert rating into percentage
  const rating = setPercentRating(vote_average);

  // determine color of rating badge based on rating percentage
  const ratingBadge = setBadgeColor(rating, 'badge');

  return (
    <div
      onClick={handleIdChange}
      className={`card flex flex-col justify-between mr-4 bg-base-200 shadow-xl mb-6 ${
        // determine card sizing based on whether display mode is grid or row
        display === 'grid' ? `w-auto lg:w-auto` : `shrink-0 w-40 lg:w-48`
      }`}
    >
      <Link to={`/${media_type}/${id}`}>
        <figure onClick={handleIdChange}>
          <img
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt={`${name} poster`}
          />
        </figure>
      </Link>
      <div className="pb-4">
        <div className="card-body py-2 px-4">
          <h2 className="text-1xl truncate">{name || title}</h2>
        </div>
        <div className={`badge ${ratingBadge} ml-4`}>{`${rating}%`}</div>
      </div>
    </div>
  );
}

export default ResultCard;
