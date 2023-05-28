import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  testAnswer: "",
  coverLetter: "",
};

export const traineeDetailedVacancyPageSlice = createSlice({
  name: "traineeDetailedVacancyPageSlice",
  initialState,
  reducers: {
    setTestAnswer: (state, { payload }: PayloadAction<string>) => {
      state.testAnswer = payload.trimStart();
    },

    setCoverLetter: (state, { payload }: PayloadAction<string>) => {
      state.coverLetter = payload.trimStart();
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
