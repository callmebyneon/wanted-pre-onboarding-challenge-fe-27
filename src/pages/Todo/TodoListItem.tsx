import { Link } from "react-router-dom";
import { getCreatedBefore } from "../../shared/ui/util_fns";

export type TodoInput = {
  title: string;
  content: string;
}
export type TodoData = TodoInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
}
const TodoListItem = ({ todo }: { todo: TodoData }) => {
  const { id, title, content, createdAt } = todo;
  return (
    <li>
      <Link to={id}>
        <p>{title}</p>
        <span>{content}</span>
        <caption>{getCreatedBefore(createdAt)}</caption>
      </Link>
    </li>
  );
}

export default TodoListItem