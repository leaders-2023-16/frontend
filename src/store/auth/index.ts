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
        user: { access: '', refresh: '', role: Role.USER },
        error: ''
    };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
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
                state.user = { access: payload.access, refresh: payload.refresh, role: Role.USER }
                state.error = '';
            })
            .addCase(loginAsync.rejected, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(registerAsync.fulfilled, (state) => {
                state.error = '';
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = { access: '', refresh: '', role: Role.USER };
                state.error = '';
            });
    }
});

export const { actions: authActions, reducer: authReducer } = authSlice;