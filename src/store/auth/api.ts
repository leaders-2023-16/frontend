import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { authActions } from ".";
import authService from "../../services/authService";
import { UserRegister, UserCredentials, User } from "./types";

export const registerAsync = createAsyncThunk<User, UserRegister>(
    'auth/register',
    async (userRegister: UserRegister, { dispatch, rejectWithValue }) => {
        if (userRegister.password !== userRegister.passwordConf) {
            dispatch(authActions.setError({field: 'password', value: `Your password doesn't match`}));
            return rejectWithValue(`Your password doesn't match`);
        }
        try {
            const response = await authService.register(userRegister);

            if (response.status === 200) {
                return response;
            }
        } catch (_error) {
            const error = _error as Error | AxiosError;
            console.error(error);
            if (axios.isAxiosError(error)) {
                dispatch(authActions.setError(error.response?.data.message));
                return rejectWithValue(error.response?.data.message);
            }
            dispatch(authActions.setError({field: 'username', value: error.message}));
            return rejectWithValue(error.message);
        }
    }
);

export const loginAsync = createAsyncThunk<User, UserCredentials>(
    'auth/login',
    async (userCredentials: UserCredentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await authService.login(
                userCredentials.username,
                userCredentials.password
            );
            if (response.access) {
                return response;
            }
        } catch (_error) {
            const error = _error as Error | AxiosError;
            console.error(error);
            if (axios.isAxiosError(error)) {
                dispatch(authActions.setError(error.response?.data.message));
                return rejectWithValue(error.response?.data.message);
            }
            dispatch(authActions.setError({field: 'password', value: error.message}));
            return rejectWithValue(error.message);
        }
    }
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
    authService.logout();
});