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