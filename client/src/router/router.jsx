import { createBrowserRouter } from "react-router-dom";
import { LoginPage, HomePage, CallsPage, ActiveCallsPage, DefaultPage, NewPaymentPage } from "../pages";
import { PaymentsHistory } from "../pages/payments-history/payments-history";
import App from "../App";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
    {   
        element: <App />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [{
                    element: <HomePage />
                }]
            },
            {
                path: "/calls",
                element: <ProtectedRoute />,
                children: [{
                    element: <CallsPage />
                }]
            },
            {
                path: "/active-calls",
                element: <ProtectedRoute />,
                children: [{
                    element: <ActiveCallsPage />
                }]
            },
            {
                path: "/new-payment",
                element: <ProtectedRoute />,
                children: [{
                    element: <NewPaymentPage />
                }]
            },
            {
                path: "/payments-history",
                element: <ProtectedRoute />,
                children: [{
                    element: <PaymentsHistory />
                }]
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]); 