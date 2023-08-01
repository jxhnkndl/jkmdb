import React from 'react';

function HeroImage({ backdropUrl, posterUrl, title }) {
  return (
    <div
      className="grid grid-cols-3 w-auto min-h-200 md:min-h-350 lg:min-h-400 bg-center lg:bg-top my-6"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${backdropUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* poster */}
      <div className="col-span-1">
        <figure>
          <img
            className="w-72 m-4 border-4 border-base-300 shadow-2xl shadow-base-300"
            src={`https://image.tmdb.org/t/p/w342/${posterUrl}`}
            alt={`${title} poster`}
          />
        </figure>
      </div>
    </div>
  );
}

export default HeroImage;
