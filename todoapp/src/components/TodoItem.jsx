import { useContext, useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import PropTypes from "prop-types";

import styled from "styled-components";
import { TodoContext } from "../context/todoContext";
import { deleteTodo, patchTodo } from "../services/TodoService";

const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  width: 100%;
  color: #000;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ccc;
  }
`;

const TodoTask = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const TaskName = styled.p`
  margin: 0px;
  margin-left: 10px;
  font-weight: 500;
`;

const CustomMenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuIcon = styled(BsThreeDotsVertical)`
  cursor: pointer;
`;

const CustomMenu = styled.div`
  z-index: 10;
  position: absolute;
  top: -8px;
  right: 27px;
  display: inline-block;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const CustomMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  border: none;
  background-color: #fff;
  text-align: left;
  cursor: pointer;
  color: #333;
  color: red;
  font-size: 12px;

  &:hover {
    outline: none;
    border: none;
  }
`;
const TodoItem = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [menuVisible, setMenuVisible] = useState(false);
  const { state, dispatch, setLoading, setError } = useContext(TodoContext);

  const onClickHandler = () => {
    setIsChecked(!isChecked);
    setLoading(true);
    patchTodo(todo._id, { completed: !isChecked })
      .then(() => {
        setLoading(false);
      })
      .catch((ex) => {
        setError(ex.message);
        setLoading(false);
      });
    const newInitialArray = state.initialTodo.map((todoItem) => {
      if (todoItem._id === todo._id) {
        return {
          ...todoItem,
          completed: !isChecked,
        };
      }
      return todoItem;
    });

    const newTodos = state.todos.map((todoItem) => {
      if (todoItem._id === todo._id) {
        return {
          ...todoItem,
          completed: !isChecked,
        };
      }
      return todoItem;
    });

    dispatch({
      type: "ADD_TODOS",
      payload: {
        todos: newTodos,
        initialTodo: newInitialArray,
      },
    });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuVisible(!menuVisible);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setLoading(true);
    // alert(todo._id);
    dispatch({ type: "REMOVE_TODO", payload: todo._id });

    try {
      await deleteTodo(todo._id);
      setLoading(false);
    } catch (ex) {
      setError(ex);
      setLoading(false);
    }

    setMenuVisible(!menuVisible);
  };
  return (
    <Todo onClick={onClickHandler}>
      <TodoTask>
        <CustomCheckbox checked={isChecked} onChange={onClickHandler} />
        <TaskName>{todo.task}</TaskName>
      </TodoTask>

      <CustomMenuWrapper>
        <MenuIcon size={24} color="#a6a6a6" onClick={toggleMenu} />

        {menuVisible && (
          <CustomMenu>
            <CustomMenuItem>
              <BsTrash color="red" />
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </CustomMenuItem>
          </CustomMenu>
        )}
      </CustomMenuWrapper>
    </Todo>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    // Add more specific prop types if needed
  }).isRequired,
};
