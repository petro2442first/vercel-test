import { useEffect } from "react";
import { useNotification } from "../../hooks/use-notification/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { selectNotifications } from "../../store/selectors/user-selectors";
import { hideNotification } from "../../store/slices/user.slice";

import './show-notification.scss'

export const ShowNotification = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotifications);

    const notificationIconMap = {
        'success': () => <i className="notification-icon fa-solid fa-circle-check"></i>,
        'error': () => <i className="notification-icon fa-solid fa-circle-exclamation"></i>,
        'info': () => <i className="notification-icon fa-solid fa-circle-info"></i>
    }

    useEffect(() => {
        if (notifications.length > 0) {
            const lastNotification = notifications.at(-1);
            setTimeout(() => {
                dispatch(hideNotification(lastNotification.id));
            }, lastNotification.time * 1000)
        }
    }, [notifications])

    const handleClose = (id) => {
        dispatch(hideNotification(id));
    }

    return (
        <div>
            {notifications.map((notification, index) => {
                const NotificationIcon = notificationIconMap[notification.type];

                return (
                    <div className={`notification ${notification.type}`} style={{ bottom: `${(20 + 50) * (index) + 20}px` }}>
                        <NotificationIcon />

                        <div className="notification__content">
                            <h3 className="notification__title">{notification.title}</h3>
                            <p className="notification__description">{notification.description}</p>
                        </div>

                        <i className="fa-solid fa-xmark notification__close" onClick={() => handleClose(notification.id)}></i>
                    </div>
                )
            })}
            
        </div>
    )
}