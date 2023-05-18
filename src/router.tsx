import {
    createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { IndexPage } from "./pages/IndexPage";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Login } from "./pages/LoginPage";
import { SignUp } from "./pages/SignUpPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
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