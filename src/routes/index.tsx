import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/auth/signup";
import Login from "../pages/auth/login";
import Layout from "../layout";
import Dashboard from "../pages/dashboard";
import { useUserContext } from "../context/usercontext";

export default createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        element: <AuthRoutes />,
        children: [
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
       // Catch-all route to redirect to login if no matching route is found
       {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

function PrivateRoutes() {
  const { isLoggedIn } = useUserContext();
  if (isLoggedIn) return <Outlet />;
  else return <Navigate to={"/login"} replace />;
}

function AuthRoutes() {
  const { isLoggedIn } = useUserContext();
  if (!isLoggedIn) return <Outlet />;
  else return <Navigate to={"/dashboard"} replace />;
}
