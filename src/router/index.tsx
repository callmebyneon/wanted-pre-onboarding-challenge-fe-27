import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Todo from "../components/Todo";
import TodoDetail from "../components/Todo/TodoDetail";
import { Login, Signup } from "../components/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "list",
        element: <Todo />,
        children: [
          {
            path: ":id",
            element: <TodoDetail />,
          }
        ]
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
    ]
  },
]);

export default router