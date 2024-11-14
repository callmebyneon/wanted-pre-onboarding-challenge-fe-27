import { createBrowserRouter } from "react-router-dom";

/* pages */
import MainLayout from "@/pages/Layout/MainLayout";
import Home from "@/pages/Home";
import Todo from "@/pages/Todo";
import TodoDetail from "@/pages/Todo/TodoDetail";
import { Login, Signup } from "@/pages/Auth";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
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

export default appRouter