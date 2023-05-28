import { IntershipApplicationStatus } from "@/types/IntershipApplication";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlyRecommended: true,
  selectedStatus: undefined as IntershipApplicationStatus | undefined,
};

export const curatorInternshipApplicationPageSlice = createSlice({
  name: "curatorInternshipApplicationPageSlice",
  initialState,
  reducers: {
    setOnlyRecommended: (state, { payload }: PayloadAction<boolean>) => {
      state.onlyRecommended = payload;
    },
    setSelectedStatus: (
      state,
      { payload }: PayloadAction<IntershipApplicationStatus | undefined>
    ) => {
      state.selectedStatus = payload;
    },
  },
});

export const {
  actions: curatorInternshipApplicationPageActions,
  reducer: curatorInternshipApplicationPageReducer,
} = curatorInternshipApplicationPageSlice;
