import { createBrowserRouter } from "react-router-dom";
import { LoginPage, HomePage, CallsPage, ActiveCallsPage, DefaultPage, NewPaymentPage } from "../pages";
import { PaymentsHistory } from "../pages/payments-history/payments-history";

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
            {
                path: "/active-calls",
                element: <ActiveCallsPage />,
            },
            {
                path: "/new-payment",
                element: <NewPaymentPage />,
            },
            {
                path: "/payments-history",
                element: <PaymentsHistory />,
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]); 