import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlyActive: true,
};

export const curatorWorkPlacesPageSlice = createSlice({
  name: "curatorWorkPlacesPageSlice",
  initialState,
  reducers: {
    setOnlyActive: (state, { payload }: PayloadAction<boolean>) => {
      state.onlyActive = payload;
    },
  },
});

export const {
  actions: curatorWorkPlacesPageActions,
  reducer: curatorWorkPlacesPageReducer,
} = curatorWorkPlacesPageSlice;
