import { Navigate, createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "./components/Layout";
import { Login } from "./pages/LoginPage";
import { SignUp } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { AuthorizedLayout } from "./layouts/AuthorizedLayout";
import { UnAuthorizedLayout } from "./layouts/UnAuthorizedLayout";
import { IndexPage } from "./pages/Index";
import { CreateVacancyPage } from "./pages/CreateVacancy";
import { VacanciesPage } from "./pages/Vacancies";

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
            path: "create-vacancy",
            element: <CreateVacancyPage />,
          },
          {
            path: "vacancies",
            element: <VacanciesPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
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
