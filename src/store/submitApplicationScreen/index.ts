import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TrainDirectionByName } from "./types";

const initialState = {
  selectedDirectionTrain: undefined as
    | keyof typeof TrainDirectionByName
    | undefined,
};

export const submitApplicationScreenSlice = createSlice({
  name: "submitApplicationScreen",
  initialState,
  reducers: {
    selectDirectionTrain: (
      state,
      action: PayloadAction<keyof typeof TrainDirectionByName>
    ) => {
      state.selectedDirectionTrain = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  actions: submitApplicationScreenActions,
  reducer: submitApplicationScreenReducer,
} = submitApplicationScreenSlice;
