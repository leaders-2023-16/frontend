import {
    createBrowserRouter,
} from "react-router-dom";
import { LayoutPage } from "./components/Layout";
import { IndexPage } from "./pages/IndexPage";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Login } from "./pages/LoginPage";
import { SignUp } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/profile/ProfilePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            {
                path: "/",
                element: <IndexPage />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "page",
                element: <PrivateRoute />,
                children: [
                    {
                        path: "a",
                        element: <IndexPage />,
                    }
                ]
            },

        ],
    },
]);