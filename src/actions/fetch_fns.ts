import { TodoInput } from "../components/pages/Todo/TodoListItem";
import { BASE_URL } from "../constants/base_url";

export const getTodos = () => fetch(BASE_URL + "/todos", {
  headers: {
    Authorization: localStorage.getItem("token") as string,
  }
})
  .then(res => res.json())
  .then(data => data.data)
  .catch(err => console.error(err))

export const getTodoById = (id: string) => () => fetch(BASE_URL + "/todos/" + id, {
  headers: {
    Authorization: localStorage.getItem("token") as string,
  }
})
  .then(res => res.json())
  .then(data => data.data)
  .catch(err => console.error(err))
  
export const createTodo = async (newTodo: TodoInput) => {
  console.log({newTodo})
  return fetch(BASE_URL + "/todos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token") as string,
  },
  body: JSON.stringify(newTodo)
})
  .then(res => res.json())
  .catch(err => console.error(err))
}

export const updateTodo = (id: string) => async (newTodo: TodoInput) => {
  return fetch(BASE_URL + "/todos/" + id, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token") as string,
  },
  body: JSON.stringify(newTodo)
})
  .then(res => res.json())
  .catch(err => console.error(err))
}

export const deleteTodo = (id: string) => async () => {
  return fetch(BASE_URL + "/todos/" + id, {
  method: "DELETE",
  headers: {
    Authorization: localStorage.getItem("token") as string,
  },
})
  .then(res => res.json())
  .catch(err => console.error(err))
}