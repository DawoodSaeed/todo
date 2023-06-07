import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const initialState = {
  user: {},
  token: "",
  loading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "DELETE_USER":
      return {
        ...state,
        user: {},
        token: "",
      };

    case "USER_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "USER_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const setUser = (user, token) => {
    dispatch({ type: "SET_USER", payload: { user, token } });
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
  };

  const getUser = () => {
    return state.user;
  };

  const logout = () => {
    dispatch({ type: "DELETE_USER" });
    Cookies.remove("token");
    Cookies.remove("user");
  };

  const setUserLoading = (isLoading) => {
    dispatch({ type: "USER_LOADING", payload: isLoading });
  };

  const setUserError = (message) => {
    dispatch({ type: "USER_ERROR", payload: message });
  };
  const contextValue = {
    setUser,
    getUser,
    logout,
    setUserLoading,
    setUserError,
    state,
    dispatch,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
