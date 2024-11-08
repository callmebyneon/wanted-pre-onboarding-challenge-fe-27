import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Todo from "../components/pages/Todo";
import TodoDetail from "../components/pages/Todo/TodoDetail";
import { Login, Signup } from "../components/pages/Auth";

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