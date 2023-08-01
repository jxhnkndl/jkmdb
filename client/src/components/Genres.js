import React from 'react';

function Genres({ genres }) {
  return (
    <div className="flex flex-wrap text-[10px] sm:text-sm mb-5">
      {genres &&
        genres.map((genre, index) => (
          <span key={index} className="font-bold mb-2 mr-3 border p-2">
            {genre}
          </span>
        ))}
    </div>
  );
}

export default Genres;
