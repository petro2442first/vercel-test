import { createSlice } from "@reduxjs/toolkit";
// import { fetchUserAuthStatus, loginUser } from "../actions/user-actions";

const initialState = {
    authData: {
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

export const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.notifications.push({
                time: 50,
                ...action.payload,
                id: Date.now()
            });
        },
        hideNotification: (state, action) => {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
        },
    },
    extraReducers: {}
})

export const { showNotification, hideNotification } = userSlice.actions;
export default userSlice.reducer;