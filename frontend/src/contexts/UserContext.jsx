import {
  React, createContext, useReducer, useMemo, useEffect,
} from 'react';

export const UserContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.payload.username,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return { username: null, token: null };
    default:
      return state;
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(
    userReducer,
    {
      username: null,
      token: null,
    },
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  const stateMemo = useMemo(() => ({ ...state, dispatch }), [state]);
  return (
    <UserContext.Provider value={stateMemo}>
      { children }
    </UserContext.Provider>
  );
}
