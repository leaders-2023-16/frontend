import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlyRecommended: true,
  onlyWithoutAction: true,
};

export const curatorInternshipApplicationPageSlice = createSlice({
  name: "curatorInternshipApplicationPageSlice",
  initialState,
  reducers: {
    setOnlyRecommended: (state, { payload }: PayloadAction<boolean>) => {
      state.onlyRecommended = payload;
    },
    setOnlyWithoutAction: (state, { payload }: PayloadAction<boolean>) => {
      state.onlyWithoutAction = payload;
    },
  },
});

export const {
  actions: curatorInternshipApplicationPageActions,
  reducer: curatorInternshipApplicationPageReducer,
} = curatorInternshipApplicationPageSlice;
