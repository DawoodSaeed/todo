import CowlarAPI from "../api/CowlarApi";

export const addTodo = async (todo) => {
  const data = await CowlarAPI.post("/todos", todo);
  return data;
};

export const deleteTodo = async (id) => {
  const data = await CowlarAPI.delete(`/todos/${id}`);
  return data;
};

export const getTodos = async () => {
  const data = await CowlarAPI.get("/todos");
  return data;
};

export const patchTodo = async (id, todo) => {
  const data = await CowlarAPI.patch(`/todos/${id}`, todo);
  return data;
};
