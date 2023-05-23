import { Navigate, createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "./components/Layout";
import { IndexPage } from "./pages/IndexPage";
import { Login } from "./pages/LoginPage";
import { SignUp } from "./pages/SignUpPage";
import { TraineeProfilePage } from "./pages/traineeProfile/ProfilePage";
import { AuthorizedLayout } from "./layouts/AuthorizedLayout";
import { UnAuthorizedLayout } from "./layouts/UnAuthorizedLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <AuthorizedLayout />,
        children: [
          {
            path: "/",
            element: <IndexPage />,
          },
          {
            path: "profile",
            element: <TraineeProfilePage />,
          },
        ],
      },
      {
        path: "/",
        element: <UnAuthorizedLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" replace={true} />,
      },
    ],
  },
]);
