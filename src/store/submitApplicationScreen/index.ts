import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import candidateService from "../../services/candidateService";
import axios, { AxiosError } from "axios";
import { notification } from "antd";
import { TrainDirectionByName } from "./types";

const initialState = {
  selectedDirectionTrain: undefined as
    | keyof typeof TrainDirectionByName
    | undefined,
  directionTrainSelectError: undefined as string | undefined,

  isSubmitingApplication: false,
};

export const submitApplicationActionAsync = createAsyncThunk(
  "auth/login",
  async (direction: number, thunkApi) => {
    try {
      const response = await candidateService.submitApplication(direction);
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });

      return response;
    } catch (_error) {
      const error = _error as Error | AxiosError;
      console.error(error);

      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });

      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const submitApplicationScreenSlice = createSlice({
  name: "submitApplicationScreen",
  initialState,
  reducers: {
    selectDirectionTrain: (state, action: PayloadAction<string>) => {
      state.selectedDirectionTrain = action.payload;
      state.directionTrainSelectError = undefined;
    },

    setDirectionTrainSelectError: (state, action: PayloadAction<string>) => {
      state.directionTrainSelectError = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitApplicationActionAsync.pending, (state, { payload }) => {
        state.isSubmitingApplication = true;
      })
      .addCase(submitApplicationActionAsync.fulfilled, (state) => {
        state.isSubmitingApplication = false;
      })
      .addCase(submitApplicationActionAsync.rejected, (state) => {
        state.isSubmitingApplication = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  actions: submitApplicationScreenActions,
  reducer: submitApplicationScreenReducer,
} = submitApplicationScreenSlice;
