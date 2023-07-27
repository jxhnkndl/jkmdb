import {
  REGISTER_USER,
  SET_AUTH_LOADING_TRUE,
  SET_AUTH_LOADING_FALSE,
} from './authTypes';

export const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };

    case SET_AUTH_LOADING_TRUE:
      return {
        ...state,
        loading: true
      };

    case SET_AUTH_LOADING_FALSE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
