import styled from "styled-components";
import imageBackground from "./Imagebackground.png";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Container = styled.div`
  background: url(${imageBackground}) #33373b no-repeat center/cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
`;

const TodoLayout = () => {
  const { state, logout } = useContext(UserContext);

  return (
    <Container>
      <div
        style={{
          position: "absolute",
          top: "10px",
          alignSelf: "flex-end",
          marginRight: "20px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {state.token ? <p onClick={logout}>Logout</p> : null}
      </div>
      <Outlet />
    </Container>
  );
};

export default TodoLayout;
