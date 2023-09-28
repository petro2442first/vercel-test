import { createContext, useCallback, useMemo, useState } from "react";
import { ShowNotification } from "../components/show-notification/show-notification";

export const NotificationsContext = createContext({});

export const NotificationsProvider = ({ children }) => {
    const [activeNotification, setActiveNotification] = useState(null);

    const showSuccessNotification = useCallback(({
        title, description, time = 5
    }) => {
        setActiveNotification({
            type: 'success',
            title,
            description,
            time
        })
    }, []);

    const showErrorNotification = useCallback(({
        title, description, time = 5
    }) => {
        setActiveNotification({
            type: 'error',
            title,
            description,
            time
        })
    }, []);

    const hideNotification = () => {
        setActiveNotification(null)
    }

    const contextValue = useMemo(() => ({
        showSuccessNotification,
        showErrorNotification,
        hideNotification,
        activeNotification
    }), activeNotification);

    return (
        <NotificationsContext.Provider value={contextValue}>
            {children}
            <ShowNotification />
        </NotificationsContext.Provider>
    )
}