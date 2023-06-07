import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiCalendar2Fill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TodoContext } from "../context/todoContext";
// import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../services/TodoService";

const DropdownWrapper = styled.div`
  margin-top: 25px;
  z-index: 1000;
  position: relative;
  display: inline-block;
  color: #ffffff;
  width: 100%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.0001) 100%
  );
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.157326),
    inset 0px -2px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5.43656px);
`;

const DropdownHeader = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownOptions = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-color: #a89b8a;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.157326),
    inset 0px -2px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5.43656px);
`;

const DropdownOption = styled.li`
  cursor: pointer;
  padding: 10px;
  &:hover {
    opacity: 0.8;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #7d7a75;
  }
`;

const DropdownIcon = styled(IoMdArrowDropdown)`
  color: #8a675d;
`;

// const Menu = styled(AiOutlineMenu)`
//   color: #8a675d;
// `;

const Input = styled.input`
  width: 80%;
  height: 100%;
  background: transparent;
  border: none;
  margin-left: 5px;
  text-transform: capitalize;
  font: inherit;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #fff;
  }
`;

const DatePickerWrapper = styled.div`
  position: relative;
`;

const MyDatePicker = styled(DatePicker)`
  display: none;
`;
const CustomDropdown = () => {
  const { state, dispatch, setLoading, setError } = useContext(TodoContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Todo");
  const [isInputShown, setIsInputShown] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    state.todoItem.completionTime
  );
  const [isDatepickerOpen, setIsDickerpickerOpen] = useState(false);
  const [inputValue, setInputValue] = useState(state.todoItem.task);

  useEffect(() => {
    if (selectedOption === "Add New Todo") {
      setIsInputShown(true);
      const filteredTodos = state.initialTodo.filter((todo) => !todo.completed);
      dispatch({
        type: "ADD_TODOS",
        payload: { todos: filteredTodos, initialTodo: state.initialTodo },
      });

      return;
    }
    setIsInputShown(false);

    if (selectedOption === "All Todo") {
      const filteredTodos = state.initialTodo.filter((todo) => !todo.completed);
      dispatch({
        type: "ADD_TODOS",
        payload: { todos: filteredTodos, initialTodo: state.initialTodo },
      });

      return;
    }
    const filteredTodos = state.initialTodo.filter((todo) => {
      const completionTime = new Date(todo.completionTime);
      const currentDate = new Date();

      if (selectedOption === "Today Todo" && !todo.completed) {
        const isToday = isSameDate(completionTime, currentDate);
        return isToday;
      } else if (selectedOption === "Tomorrow Todo" && !todo.completed) {
        const isTomorrow = isTomorrowDate(completionTime, currentDate);
        return isTomorrow;
      } else if (selectedOption === "Next Week Todo" && !todo.completed) {
        const isNextWeek = isWithinNextWeek(completionTime, currentDate);
        return isNextWeek;
      } else if (selectedOption === "Completed Todos" && todo.completed) {
        return todo;
      }
    });

    function isSameDate(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }

    function isTomorrowDate(date1, date2) {
      const tomorrow = new Date(date2);
      tomorrow.setDate(date2.getDate() + 1);
      return isSameDate(date1, tomorrow);
    }

    function isWithinNextWeek(date1, date2) {
      const nextWeek = new Date(date2);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const tomorrow = new Date(date2);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return date1 > tomorrow && date1 <= nextWeek;
    }

    dispatch({
      type: "ADD_TODOS",
      payload: { todos: filteredTodos, initialTodo: state.initialTodo },
    });
  }, [state.initialTodo, dispatch, selectedOption]);
  // Toggle handlers.......
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDatePicker = (e) => {
    e.stopPropagation();
    if (isInputShown) setIsDickerpickerOpen(!isDatepickerOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // On Change handler for the date and input fields
  const onClickInput = (e) => {
    e.stopPropagation();
  };
  const handleDateChange = (date, e) => {
    setSelectedDate(date);
    setIsDickerpickerOpen(!isDatepickerOpen);
    dispatch({
      type: "TODO_ITEM",
      payload: { task: inputValue, completionTime: date },
    });
    e.stopPropagation();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    dispatch({
      type: "TODO_ITEM",
      payload: { task: event.target.value, completionTime: selectedDate },
    });
  };

  const onEnterHandler = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      event.preventDefault();
      if (!selectedDate) {
        dispatch({
          type: "ERROR",
          payload: "Completion time must be provided",
        });
        return;
      } else if (!inputValue) {
        dispatch({ type: "ERROR", payload: "Task name must be provided" });
        return;
      }

      const newTodo = {
        task: inputValue.trim(),
        completionTime: selectedDate,
      };

      addTodo(newTodo)
        .then((data) => {
          dispatch({ type: "ADD_TODO", payload: data });
          setLoading(false);
        })
        .catch((ex) => {
          setError(ex.message);
          setLoading(false);
        });
      setInputValue("");
    }
  };
  return (
    <DropdownWrapper>
      <DropdownHeader onClick={toggleDropdown}>
        <DatePickerWrapper>
          <MyDatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            onClickOutside={() => setIsOpen(false)}
            open={isDatepickerOpen}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
          />
        </DatePickerWrapper>
        <RiCalendar2Fill
          onClick={toggleDatePicker}
          color="#8a675d"
          style={{ marginRight: "15px" }}
        />

        {isInputShown ? (
          <Input
            placeholder="Enter New Item"
            onClick={onClickInput}
            onChange={handleInputChange}
            value={inputValue}
            onKeyDown={onEnterHandler}
          />
        ) : (
          <span style={{ flexGrow: 1 }}>
            {selectedOption || "Select an option"}
          </span>
        )}

        <DropdownIcon />
      </DropdownHeader>
      {isOpen && (
        <DropdownOptions>
          {selectedOption !== "All Todo" && (
            <DropdownOption onClick={() => handleOptionSelect("All Todo")}>
              All Todos
            </DropdownOption>
          )}

          {selectedOption !== "Today Todo" && (
            <DropdownOption onClick={() => handleOptionSelect("Today Todo")}>
              Today Todos
            </DropdownOption>
          )}

          {selectedOption !== "Tomorrow Todo" && (
            <DropdownOption onClick={() => handleOptionSelect("Tomorrow Todo")}>
              Tomorrow Todos
            </DropdownOption>
          )}

          {selectedOption !== "Next Week Todo" && (
            <DropdownOption
              onClick={() => handleOptionSelect("Next Week Todo")}
            >
              Next Week Todos
            </DropdownOption>
          )}

          {selectedOption !== "Completed Todos" && (
            <DropdownOption
              onClick={() => handleOptionSelect("Completed Todos")}
            >
              Completed Todos
            </DropdownOption>
          )}

          {!isInputShown && (
            <DropdownOption onClick={() => handleOptionSelect("Add New Todo")}>
              Add New Todo
            </DropdownOption>
          )}
          {/* Add more options as needed */}
        </DropdownOptions>
      )}
    </DropdownWrapper>
  );
};

export default CustomDropdown;
