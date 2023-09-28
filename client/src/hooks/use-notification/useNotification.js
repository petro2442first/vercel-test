import { useContext } from "react"
import { NotificationsContext } from "../../providers/notification-provider";

export const useNotification = () => {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error('useNotification must be used within an NotificationProvider');
    }

    return context;
}