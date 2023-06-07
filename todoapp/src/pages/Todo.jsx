import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
// import userProfile from "./userProfile.jpeg";
import userProfile from "./Avataruser.png";
import CustomDropdown from "../components/CustomDropdown";
import TodoList from "../components/TodoList";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../context/todoContext";
import Notification from "../components/Notification";
import { addTodo, getTodos } from "../services/TodoService";
import { handleUpload } from "../services/UserService";
import { UserContext } from "../context/UserContext";
import { API_URL } from "../utility/URL";

const Container = styled.div``;

const Image = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 100%;
  object-fit: cover;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.157326),
    inset 0px -2px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2.71828px);
`;

const MiniContainer = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.div`
  background: linear-gradient(
    180deg,
    rgba(117, 169, 149, 0.8) 0%,
    rgba(77, 139, 134, 0.6) 100%
  );
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.2),
    inset 0px 2px 0px rgba(255, 255, 255, 0.157326),
    inset 0px -2px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5.43656px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 8px;
  width: 100%;
  height: 54px;
  margin-top: 20px;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Todo = () => {
  const { state, dispatch, setLoading, setError } = useContext(TodoContext);
  const { getUser } = useContext(UserContext);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState();
  useEffect(() => {
    // const todoList = [
    //   {
    //     id: 1,
    //     task: "Wake Up",
    //     completed: true,
    //     creationTime: new Date(),
    //     completionTime: new Date(),
    //   },
    //   {
    //     id: 2,
    //     task: "Have a breakfast",
    //     completed: false,
    //     creationTime: new Date(),
    //     completionTime: new Date(),
    //   },
    //   {
    //     id: 3,
    //     task: "Explore the world",
    //     completed: true,
    //     creationTime: new Date(),
    //     completionTime: setTomorrow(),
    //   },
    //   {
    //     id: 4,
    //     task: "Chill Out",
    //     completed: false,
    //     creationTime: new Date(),
    //     completionTime: setTomorrow(),
    //   },
    //   {
    //     id: 5,
    //     task: "Back to sleep",
    //     completed: false,
    //     creationTime: new Date(),
    //     completionTime: setNextWeek(),
    //   },
    // ];
    setLoading(true);
    (async () => {
      try {
        const todoList = await getTodos();
        const filteredTodos = todoList.filter((todo) => !todo.completed);
        dispatch({
          type: "ADD_TODOS",
          payload: {
            initialTodo: todoList,
            todos: filteredTodos,
          },
        });
        setLoading(false);
      } catch (ex) {
        setError(ex.message);
        setLoading(false);
      }
    })();

    const image = getUser().image;
    if (image) {
      const imagePath = image;
      const regex = /\\(.*)$/;
      const result = regex.exec(imagePath);
      if (result && result.length > 1) {
        const afterBackslash = result[1];
        setImage(API_URL + "/uploads/" + afterBackslash);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const addTodoHandler = () => {
    setLoading(true);
    const { todoItem } = state;
    const { task, completionTime } = todoItem;
    if (!completionTime) {
      dispatch({
        type: "ERROR",
        payload: "Completion time must be provided",
      });
      return;
    } else if (!task) {
      dispatch({ type: "ERROR", payload: "Task name must be provided" });
      return;
    }

    const newTodo = {
      task: task.trim(),
      completionTime: completionTime,
    };

    addTodo(newTodo)
      .then((data) => {
        dispatch({ type: "ADD_TODO", payload: data });
        setLoading(false);
      })
      .catch((ex) => {
        dispatch({ type: "ERROR", payload: ex.message });
        setLoading(false);
      });
    dispatch({
      type: "TODO_ITEM",
      payload: {
        task: "",
        completionTime: null,
      },
    });
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    handleUpload(file)
      .then(() => {
        // setUser(updatedUser, state.token);
        setLoading(false);
      })
      .catch((ex) => {
        if (ex.response) {
          setError(ex.response.data);
        }
        setLoading(false);
      });
  };

  const triggerImageField = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Container>
        <MiniContainer>
          {/* user profile image  */}
          <Row>
            <Col>
              <Image
                src={previewImage ? previewImage : image ? image : userProfile}
                alt="User profile image"
                onClick={triggerImageField}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </Col>
          </Row>

          {/* Input Field / dropdown  */}

          <CustomDropdown todoList={state.todos} />

          <TodoList todoList={state.todos} />

          <Button onClick={addTodoHandler}>Add New Task</Button>
        </MiniContainer>

        {state.error && <Notification />}
      </Container>
    </>
  );
};

export default Todo;
