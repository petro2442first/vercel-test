import { createBrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import { LoginPage, HomePage, CallsPage } from "@pages";
import { DefaultPage } from "../pages/defaul-page/defaul-page";
import { Dashboard } from "../components/dashboard/dashboard";

export const router = createBrowserRouter([
    {   
        element: <DefaultPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/calls",
                element: <CallsPage />,
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]); 