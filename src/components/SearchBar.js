import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieContext from '../context/movie/MovieContext';

function SearchBar() {
  const [text, setText] = useState('');

  // route history
  const navigate = useNavigate();

  const { dispatch, fetchData } = useContext(MovieContext);

  // handle input change
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // handle search submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchResults = await fetchData(
      `/search/multi?query=${text}&include_adult=false&language=en-US&page=1`
    );

    // update search term in global state
    dispatch({
      type: 'SEARCH_TITLES',
      payload: searchResults,
    });

    setText('');
  };

  return (
    <form className="flex mb-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="TV Shows, Movies, People"
        className="input w-full mr-2"
        value={text}
        onChange={handleChange}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
