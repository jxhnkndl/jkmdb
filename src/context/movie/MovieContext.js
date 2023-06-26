import React, { createContext, useReducer } from 'react';
import movieReducer from './MovieReducer';
import axios from 'axios';

const TOKEN = process.env.REACT_APP_API_TOKEN;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// init axios instance for interaction with tmdb api
const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

// create movie context
const MovieContext = createContext();

// create + export movie context provider
export const MovieProvider = ({ children }) => {
  const initialState = {
    tvShows: [],
    movies: [],
    loading: false,
  };

  // init movie reducer
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // fetch api data
  const fetchData = async (endpoint) => {
    const response = await tmdb.get(endpoint);

    return response.data.results;
  } 

  return (
    <MovieContext.Provider
      value={{
        ...state,
        dispatch,
        fetchData
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
