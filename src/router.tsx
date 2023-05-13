import {
    createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { IndexPage } from "./pages/IndexPage";

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
                path: "/page",
                element: <IndexPage />,
            },

        ],
    },
]);