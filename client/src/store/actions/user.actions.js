import { createAsyncThunk } from "@reduxjs/toolkit";
import { RocketApi } from "../../api/rocket-api";

export const loginUser = createAsyncThunk(
    'user-slice/loginUser',
    async ({ username, password }) => {
        const response = await RocketApi.loginUser({ username, password });
        console.log(response);
        // if (response.status )
        return response;
    }
)