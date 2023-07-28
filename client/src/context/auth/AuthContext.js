import { createContext, useReducer } from 'react';
import { authReducer } from './AuthReducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: {},
    token: '',
    isLoggedIn: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{
      ...state,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;