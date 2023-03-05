import React, { createContext, useContext, useReducer } from "react";

// Define initial state
const initialState = {
  jwtToken: "",
  jwtRefresh: "",
};

// Define action types
const SET_JWT_TOKEN = "SET_JWT_TOKEN";
const SET_JWT_REFRESH = "SET_JWT_REFRESH";

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_JWT_TOKEN:
      return { ...state, jwtToken: action.payload };
    case SET_JWT_REFRESH:
      return { ...state, jwtRefresh: action.payload };
    default:
      return state;
  }
};

const LensContext = createContext();

const LensProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setJwtToken = (jwtToken) =>
    dispatch({ type: SET_JWT_TOKEN, payload: jwtToken });
  const setJwtRefresh = (jwtRefresh) =>
    dispatch({ type: SET_JWT_REFRESH, payload: jwtRefresh });

  // Combine state and actions into context value
  const contextValue = {
    ...state,
    setJwtToken,
    setJwtRefresh,
  };

  return (
    <LensContext.Provider value={contextValue}>{children}</LensContext.Provider>
  );
};

const useLensContext = () => useContext(LensContext);

export { LensProvider, useLensContext };
