import { createAsyncThunk } from "@reduxjs/toolkit";
import { RocketApi } from "../../api/rocket-api";
import { showNotification } from "../slices/user.slice";

export const loginUser = createAsyncThunk(
    'user-slice/loginUser',
    async ({ username, password }, thunkAPI) => {
        const response = await RocketApi.loginUser({ username, password });
        console.log(response.status);
        if (response.status !== 'ok') {
            thunkAPI.dispatch(showNotification({
                type: 'error',
                title: 'Login failed',
                description: 'smth went wrong',
            }))
        }
        return response;
    }
)