import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {
  initialTodo: [],
  todos: [],
  error: "",
  success: "",
  todoItem: {
    task: "",
    completionTime: null,
  },
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODOS":
      return {
        ...state,
        initialTodo: action.payload.initialTodo,
        todos: action.payload.todos,
      };
    case "ADD_TODO":
      return {
        ...state,
        initialTodo: [...state.initialTodo, action.payload],
        todos: [...state.todos, action.payload],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id != action.payload),
        initialTodo: state.initialTodo.filter(
          (todo) => todo._id != action.payload
        ),
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
      };

    case "TODO_ITEM":
      return {
        ...state,
        todoItem: action.payload,
      };

    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const setLoading = (isLoading) => {
    dispatch({
      type: "LOADING",
      payload: isLoading,
    });
  };

  const setError = (message) => {
    dispatch({ type: "ERROR", payload: message });
  };

  const contextValue = {
    setError,
    setLoading,
    state,
    dispatch,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
