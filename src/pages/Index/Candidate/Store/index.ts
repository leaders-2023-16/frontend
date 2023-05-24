import { TrainDirectionByName } from "@/types/TrainDirection";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedDirectionTrain: undefined as
    | keyof typeof TrainDirectionByName
    | undefined,
};

export const candidateIndexPageSlice = createSlice({
  name: "candidateIndexPage",
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
  actions: candidateIndexPageActions,
  reducer: candidateIndexPageReducer,
} = candidateIndexPageSlice;
