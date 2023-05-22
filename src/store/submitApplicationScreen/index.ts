import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedDirectionTrain: undefined as string | undefined,
};

export const submitApplicationScreenSlice = createSlice({
  name: "submitApplicationScreen",
  initialState,
  reducers: {
    selectDirectionTrain: (state, action: PayloadAction<string>) => {
      state.selectedDirectionTrain = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  actions: submitApplicationScreenActions,
  reducer: submitApplicationScreenReducer,
} = submitApplicationScreenSlice;
