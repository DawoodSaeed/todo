import TodoItem from "./TodoItem";
import styled from "styled-components";
import { useContext } from "react";
import { TodoContext } from "../context/todoContext";
import { ColorRing } from "react-loader-spinner";

const Todos = styled.div`
  position: relative;
  max-height: 290px;
  margin-top: 30px;
  background: #ffffffcc;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.157326);
  backdrop-filter: blur(5.43656px);
  width: 100%;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  /* Customize the scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #a8a8a8;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(138, 103, 93);
    width: 100%;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Loader = styled.div`
  position: absolute;
  top: 37%;
  right: 41%;
`;
const TodoList = () => {
  const { state } = useContext(TodoContext);
  return (
    <Todos>
      {state.todos.map((todo) => {
        return <TodoItem todo={todo} key={todo._id} />;
      })}

      {state.loading && (
        <Loader>
          <ColorRing
            visible={state.loading}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={[
              "rgba(117, 169, 149, 0.5)",
              "rgba(117, 169, 149, 0.6)",
              "rgba(117, 169, 149, 0.7)",
              "rgba(117, 169, 149, 0.8)",
              "rgba(117, 169, 149, 0.9)",
            ]}
          />
        </Loader>
      )}
    </Todos>
  );
};

export default TodoList;
