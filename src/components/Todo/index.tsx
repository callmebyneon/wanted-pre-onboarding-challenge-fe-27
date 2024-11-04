import { Outlet, useNavigate } from "react-router";
import TodoCreator from "./TodoCreator";
import TodoList from "./TodoList";
import { useEffect } from "react";

const Todo = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("로그인 후 사용해주세요")
      navigate("/login")
    }
  }, [])
  
  return (
    <main>
      <section>
        <h2>Check your to-do list:</h2>
        <TodoCreator />
        <TodoList />
      </section>
      <section>
        <Outlet />
      </section>
    </main>
  );
}

export default Todo