import React from 'react';

function Button({ isSaved, text, color, clickHandler }) {
  console.log(isSaved);

  return (
    <div className="col-span-3 md:col-span-1">
      {isSaved ? (
        <button
          className={`btn btn-neutral btn-block mb-5 shadow`}
          onClick={clickHandler}
        >
          Remove
        </button>
      ) : (
        <button
          className={`btn btn-accent btn-block mb-5 shadow`}
          onClick={clickHandler}
        >
          Add to Watchlist
        </button>
      )}
    </div>
  );
}

export default Button;
