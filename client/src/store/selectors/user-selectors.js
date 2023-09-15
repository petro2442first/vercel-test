export const selectUserLoggedState = (store) => store.userReducer.authData;

export const selectNotifications = store => store.userReducer.notifications;