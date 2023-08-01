import React from 'react';
import { useParams } from 'react-router-dom';

function ContentRating({ contentRating, airDates, releaseDate, runtime }) {
  const { mediaType } = useParams();

  return (
    <>
      {contentRating && (
        <p className="text-xs md:text-sm">
          <span className="font-bold mr-3 border p-1">{contentRating}</span>
          {mediaType === 'tv' && <>TV Series ({airDates})</>}
          {mediaType === 'movie' && (
            <>
              {releaseDate} (US) - {runtime} minutes
            </>
          )}
        </p>
      )}
    </>
  );
}

export default ContentRating;
