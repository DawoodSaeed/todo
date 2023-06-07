import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TodoProvider } from "./context/todoContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
