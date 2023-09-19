import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'user-slice/loginUser',
    async ({ login, password }) => {
        
    }
)