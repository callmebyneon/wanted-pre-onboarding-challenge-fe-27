import { useQuery } from "@tanstack/react-query";
import TodoListItem, { TodoData } from "./TodoListItem";
import style from "./todo.module.css"
import { getTodos } from "../../features/todo/fetch_fns";

const TodoList = () => {
  const { data, status } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  })
  
  if (status === 'pending') {
    return <p>Loading...</p>
  }
  if (status === 'error' || data.status >= 400) {
    return <p>Error :(</p>
  }

  return (
    <>
      <hr />
      {data.length < 1 ? (
        <p style={{ textAlign: "center" }}><i>저장된 할 일이 없습니다. 할 일을 추가하세요.</i></p>
      ): (
        <ul className={style.list}>
          {data.map((todo: TodoData) => <TodoListItem key={todo.id} todo={todo} />)}
        </ul>
      )}
    </>
  );
}

export default TodoList