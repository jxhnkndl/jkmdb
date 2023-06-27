import React from 'react';
import { Link } from 'react-router-dom';
import { SiThemoviedatabase } from 'react-icons/si';

function ResultCard(result) {
  const { poster_path, name, title, vote_average } = result.data;

  // convert rating into percentage
  const percentRating = Math.floor(vote_average * 10);

  // determine color of rating badge based on rating percentage
  const setRatingBadge = () => {
    if (percentRating >= 90) {
      return 'badge-error';
    } else if (percentRating < 90 && percentRating >= 80) {
      return 'badge-accent';
    } else if (percentRating < 80 && percentRating >= 60) {
      return 'badge-warning';
    } else if (percentRating < 60) {
      return 'badge-info';
    }
  };

  return (
    <div className="flex flex-col justify-between card w-auto md:w-80 lg:w-auto mr-4 bg-base-200 shadow-xl mb-6">
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
          {/* tv shows = name, movies = title */}
          <h2 className="text-1xl truncate">{name || title}</h2>
        </div>
        <div
          className={`badge ${setRatingBadge()} ml-4`}
        >{`${percentRating}%`}</div>
      </div>
    </div>
  );
}

export default ResultCard;
