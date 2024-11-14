import { RouterProvider } from "react-router-dom";
import appRouter from "@/app/routes";

const AppRouterProvider = () => {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default AppRouterProvider