import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieContext from '../context/movie/MovieContext';
import { searchByTitle } from '../context/movie/MovieActions';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const { dispatch } = useContext(MovieContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // handle input change
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // handle search submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // redirect to home page to display search results if user
    // is currently looking at show/movie details
    if (pathname !== '/') {
      navigate('/');
    }

    dispatch({ type: 'SET_LOADING_TRUE' });

    const searchResults = await searchByTitle(
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

    dispatch({ type: 'SET_LOADING_FALSE' })

    setSearchTerm('');
  };

  return (
    <form className="flex mb-4" onSubmit={handleSubmit}>
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
