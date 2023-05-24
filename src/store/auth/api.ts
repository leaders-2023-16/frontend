import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { authActions } from ".";
import authService from "../../services/authService";
import { UserRegister, UserCredentials } from "./types";
import { IUser } from "@/types/User";

export const registerAsync = createAsyncThunk<any, UserRegister>(
  "auth/register",
  async (userRegister: UserRegister, thunkApi) => {
    if (userRegister.password !== userRegister.passwordConf) {
      thunkApi.dispatch(authActions.setError(`Your password doesn't match`));
      return thunkApi.rejectWithValue(`Your password doesn't match`);
    }
    try {
      const response = await authService.register(userRegister);

      return response;
    } catch (_error) {
      const error = _error as Error | AxiosError;
      console.error(error);
      if (axios.isAxiosError(error)) {
        thunkApi.dispatch(authActions.setError(error.response?.data.message));
        return thunkApi.rejectWithValue(error.response?.data.message);
      }
      thunkApi.dispatch(authActions.setError(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk<
  { access: string; refresh: string; user: IUser },
  UserCredentials
>("auth/login", async (userCredentials: UserCredentials, thunkApi) => {
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
      thunkApi.dispatch(authActions.setError(error.response?.data.message));
      return thunkApi.rejectWithValue(error.response?.data.message);
    }
    thunkApi.dispatch(authActions.setError(error.message));
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});
