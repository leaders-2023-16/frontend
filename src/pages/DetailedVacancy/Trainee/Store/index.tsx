import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  testAnswer: "",
};

export const traineeDetailedVacancyPageSlice = createSlice({
  name: "traineeDetailedVacancyPageSlice",
  initialState,
  reducers: {
    setTestAnswer: (state, { payload }: PayloadAction<string>) => {
      state.testAnswer = payload;
    },

    reset: () => {
      return initialState;
    },
  },
});

export const {
  actions: traineeDetailedVacancyPageActions,
  reducer: traineeDetailedVacancyPageReducer,
} = traineeDetailedVacancyPageSlice;
