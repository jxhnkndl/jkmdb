const movieReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRENDING':
      return {
        ...state,
        tvShows: action.payload.tvShows,
        movies: action.payload.movies,
        loading: false,
      };

    case 'SEARCH_TITLES':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        searchResults: action.payload.searchResults,
        loading: false,
      };

    case 'CLEAR_SEARCH':
      return {
        ...state,
        searchTerm: '',
        searchResults: [],
        loading: false,
      };

    case 'SET_DETAILS':
      return {
        ...state,
        details: action.payload,
        loading: false,
      };

    case 'CLEAR_DETAILS':
      return {
        ...state,
        details: {},
        loading: true,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default movieReducer;
