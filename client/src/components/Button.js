import React from 'react';

function Button({ text, color, clickHandler }) {
  return (
    <div className="col-span-3 md:col-span-1">
      <button
        className={`btn btn-${color} btn-block mb-5 shadow`}
        onClick={clickHandler}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
