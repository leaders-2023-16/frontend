import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tokenService, { IUserWithCreds } from "../../services/tokenService";
import { loginAsync, registerAsync, logoutAsync } from "./api";
import { IUser } from "@/types/User";

const userWithCreds: IUserWithCreds = tokenService.getUser();
const initialState = {
  isLoadingSignIn: false,
  user: userWithCreds.user as IUser | undefined,
  error: undefined as string | undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoadingSignIn = true;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.isLoadingSignIn = false;
        state.user = payload.user;
        state.error = "";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoadingSignIn = false;
      })
      .addCase(registerAsync.fulfilled, (state, { payload }) => {
        console.log(payload);

        state.error = "";
        state.user = payload.user;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = undefined;
        state.error = "";
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
