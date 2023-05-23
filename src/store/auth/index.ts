import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import tokenService from '../../services/tokenService';
import { User, AuthState, Role } from './types';
import { loginAsync, registerAsync, logoutAsync } from './api';

const user: User = tokenService.getUser();
const initialState: AuthState = user.access
    ? {
        isLoggedIn: true,
        user: user,
        error: '',
    }
    : {
        isLoggedIn: false,
        user: { access: '', refresh: '', user_id: 0, role: Role.USER },
        error: ''
    };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<AuthState['error']>) => {
            state.error = action.payload;
        },
        refreshToken: (state, { payload }) => {
            state.user.access = payload.acess;
            state.user.refresh = payload.refresh;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, { payload }) => {
                state.isLoggedIn = true;
                state.user = { ...payload, role: Role.USER }
                state.error = undefined;
            })
            .addCase(loginAsync.rejected, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(registerAsync.fulfilled, (state, { payload }) => {
                state.isLoggedIn = true;
                state.user = { ...payload, role: Role.USER }
                state.error = undefined;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = { access: '', refresh: '', user_id: 0, role: Role.USER };
                state.error = undefined;
            });
    }
});

export const { actions: authActions, reducer: authReducer } = authSlice;
