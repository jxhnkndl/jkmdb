import React from 'react';
import { Link } from 'react-router-dom';
import { setPercentRating, setRatingBadge } from '../utils/helpers';

function ResultCard({ display, data }) {
  const { poster_path, name, title, vote_average } = data;

  // convert rating into percentage
  const rating = setPercentRating(vote_average);

  // determine color of rating badge based on rating percentage
  const ratingBadge = setRatingBadge(rating);

  return (
    <div
      className={`card flex flex-col justify-between mr-4 bg-base-200 shadow-xl mb-6 ${
        // determine sizing based on whether display mode is grid or row
        display === 'grid'
          ? `w-auto lg:w-auto`
          : `shrink-0 w-40 lg:w-48`
      }`}
    >
      <Link to="/">
        <figure>
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
