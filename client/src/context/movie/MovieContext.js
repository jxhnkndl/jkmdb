import React, { createContext, useReducer } from 'react';
import movieReducer from './MovieReducer';

// create movie context
const MovieContext = createContext();

// create + export movie context provider
export const MovieProvider = ({ children }) => {
  const initialState = {
    tvShows: [],
    movies: [],
    showDetails: {},
    movieDetails: {},
    focusId: '',
    searchResults: [],
    searchTerm: '',
    loading: false,
  };

  // init movie reducer
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
