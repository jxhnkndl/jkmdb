import React from 'react';

function SearchBar() {
  return (
    <div className="flex mb-2">
      <input
        type="text"
        placeholder="TV Shows, Movies, People"
        className="input w-full mr-2"
      />
      <button className="btn btn-primary">Search</button>
    </div>
  );
}

export default SearchBar;
