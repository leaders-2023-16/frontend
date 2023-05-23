import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tokenService from "../../services/tokenService";
import { User } from "./types";
import { loginAsync, registerAsync, logoutAsync } from "./api";

const user: User = tokenService.getUser();
const initialState = {
  isLoadingSignIn: false,

  user: user as User | undefined,
  error: undefined as string | undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    refreshToken: (state, { payload }) => {
      if (state.user) {
        state.user.access = payload.acess;
        state.user.refresh = payload.refresh;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoadingSignIn = true;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.isLoadingSignIn = false;
        state.user = {
          access: payload.access,
          refresh: payload.refresh,
          user_id: payload.user_id,
        };
        state.error = "";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoadingSignIn = false;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.error = "";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = undefined;
        state.error = "";
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
