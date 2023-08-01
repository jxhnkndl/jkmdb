import React from 'react';
import { Link } from 'react-router-dom';
import ContentRating from './ContentRating';

function MovieHeading(props) {
  const { title, contentRating, airDates, releaseDate, runtime } = props;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-3">{title}</h1>
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
      <ContentRating
        contentRating={contentRating}
        airDates={airDates}
        releaseDate={releaseDate}
        runtime={runtime}
      />
    </div>
  );
}

export default MovieHeading;
