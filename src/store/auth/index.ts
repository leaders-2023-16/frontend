import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import tokenService from '../../services/tokenService';
import { User, AuthState, Role } from './types';
import { loginAsync, registerAsync, logoutAsync } from './api';

const user: User = tokenService.getUser();
const initialState: AuthState = user.accessToken
    ? {
        isLoggedIn: true,
        user: user,
        error: '',
    }
    : {
        isLoggedIn: false,
        user: { accessToken: '', refreshToken: '', role: Role.USER },
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
            state.user.accessToken = payload.acessToken;
            state.user.refreshToken = payload.refreshToken;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, { payload }) => {
                state.isLoggedIn = true;
                state.user = payload.user;
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
                state.user = { accessToken: '', refreshToken: '', role: Role.USER };
                state.error = '';
            });
    }
});

export const { actions: authActions, reducer: authReducer } = authSlice;
