import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/user.actions";
// import { fetchUserAuthStatus, loginUser } from "../actions/user-actions";

const initialState = {
    user: {
        isLogged: false
    },
    notifications: [
        {
            id: 1,
            type: 'success',
            title: '',
            description: '',
            time: 5
        }
    ]
}

const defaultNotificationVisibleTime = 51;

export const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.notifications.push({
                id: Date.now(),
                time: defaultNotificationVisibleTime,
                ...action.payload
            });
        },
        hideNotification: (state, action) => {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user.isLogged = true;
        })
    }
})

export const { showNotification, hideNotification } = userSlice.actions;
export default userSlice.reducer;