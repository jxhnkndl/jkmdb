import React, { useState, useContext } from 'react';
import MovieContext from '../context/movie/MovieContext';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const { dispatch, fetchData } = useContext(MovieContext);

  // handle input change
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // handle search submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: 'SET_LOADING' });

    const searchResults = await fetchData(
      `/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`
    );

    // update search term in global state
    dispatch({
      type: 'SEARCH_TITLES',
      payload: {
        searchTerm,
        searchResults,
      },
    });

    setSearchTerm('');
  };

  return (
    <form className="flex mb-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="TV Shows, Movies, People"
        className="input w-full mr-2"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
