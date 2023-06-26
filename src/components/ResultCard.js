import React from 'react';
import { Link } from 'react-router-dom';

function ResultCard(result) {
  const title = result.data;

  // convert rating into percentage
  const rating = Math.floor(title.vote_average * 10);

  // determine color of rating badge based on rating percentage
  const setRatingBadge = () => {
    if (rating >= 90) {
      return 'badge-error';
    } else if (rating < 90 && rating >= 80) {
      return 'badge-accent';
    } else if (rating < 80 && rating >= 60) {
      return 'badge-warning';
    } else if (rating < 60) {
      return 'badge-info';
    }
  }

  return (
    <div className="flex flex-col justify-between card w-auto md:w-80 lg:w-auto mr-4 bg-base-200 shadow-xl mb-6">
      <Link to="/">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w342/${title.poster_path}`}
            alt={`${title.name} poster`}
          />
        </figure>
      </Link>
      <div className="pb-4">
        <div className="card-body py-2 px-4">
          {/* tv shows = name, movies = title */}
          <h2 className="text-1xl truncate">{title.name || title.title}</h2>
        </div>
        <div className={`badge ${setRatingBadge()} ml-4`}>{`${rating}%`}</div>
      </div>
    </div>
  );
}

export default ResultCard;
