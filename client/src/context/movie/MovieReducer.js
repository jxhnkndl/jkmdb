const movieReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRENDING':
      return {
        ...state,
        tvShows: action.payload.tvShows,
        movies: action.payload.movies,
      };

    case 'SEARCH_TITLES':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        searchResults: action.payload.searchResults,
      };

    case 'CLEAR_SEARCH':
      return {
        ...state,
        searchTerm: '',
        searchResults: [],
      };

    case 'SET_SHOW_DETAILS':
      return {
        ...state,
        showDetails: action.payload,
      };

    case 'SET_MOVIE_DETAILS':
      return {
        ...state,
        movieDetails: action.payload,
      };

    case 'SET_FOCUS_ID':
      return {
        ...state,
        focusId: action.payload,
      }

    case 'SET_LOADING_TRUE':
      return {
        ...state,
        loading: true,
      };
    
    case 'SET_LOADING_FALSE':
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
};

export default movieReducer;
