import { createContext, useReducer } from 'react';
import { authReducer } from './AuthReducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {};

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
};
