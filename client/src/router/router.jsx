import { createBrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import { LoginPage } from "@pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]); 