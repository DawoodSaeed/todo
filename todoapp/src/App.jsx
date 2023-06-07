import { Route, Routes } from "react-router-dom";
import TodoLayout from "./pages/TodoLayout";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/UserContext";

function App() {
  const { setUser, state } = useContext(UserContext);
  useEffect(() => {
    // If the token exist save it inside the context;
    // And the user as well;
    const token = Cookies.get("token");
    if (token) {
      if (Cookies.get("user")) {
        const user = JSON.parse(Cookies.get("user"));
        setUser(user, token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      <Route path="/*" element={<TodoLayout />}>
        {state.token ? (
          <Route index element={<Todo />} />
        ) : (
          <>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
