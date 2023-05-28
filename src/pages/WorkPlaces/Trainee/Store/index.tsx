import { ReportStatus } from "@/types/Report";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  selectedDate: undefined as string | undefined,
  visibleDate: dayjs().format("YYYY-MM-DD"),
  selectedDateStatus: undefined as ReportStatus | undefined,
};

export const traineeWorkPlacesPageSlice = createSlice({
  name: "traineeWorkPlacesPageSlice",
  initialState,
  reducers: {
    setSelectedDateStatus: (
      state,
      { payload }: PayloadAction<ReportStatus | undefined>
    ) => {
      state.selectedDateStatus = payload;
    },

    setSelectedDate: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      state.selectedDate = payload;
    },

    setVisibleDate: (state, { payload }: PayloadAction<string>) => {
      state.visibleDate = payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const {
  actions: traineeWorkPlacesPageActions,
  reducer: traineeWorkPlacesPageReducer,
} = traineeWorkPlacesPageSlice;
