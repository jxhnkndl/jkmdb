const movieReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRENDING': 
      return {
        ...state,
        tvShows: action.payload.tvShows,
        movies: action.payload.movies,
        loading: false
      }

    case 'GET_TRENDING_TV':
      return {
        ...state,
        tvShows: action.payload,
        loading: false
      }

    case 'GET_TRENDING_MOVIES':
      return {
        ...state,
        movies: action.payload,
        loading: false
      }
    
    case 'SEARCH_TITLES':
      return {
        ...state,
        searchResults: action.payload,
        loading: false
      }

    case 'SET_SEARCH_TERM': 
      return {
        ...state,
        searchTerm: action.payload
      }

    case 'RESET_LOADING':
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
}

export default movieReducer;