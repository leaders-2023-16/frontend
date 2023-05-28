import { VacancyStatus } from "@/types/Vacancy";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStatus: undefined as VacancyStatus | undefined,
};

export const curatorVacanciesPageSlice = createSlice({
  name: "curatorVacanciesPageSlice",
  initialState,
  reducers: {
    setSelectedStatus: (
      state,
      { payload }: PayloadAction<VacancyStatus | undefined>
    ) => {
      state.selectedStatus = payload;
    },
  },
});

export const {
  actions: curatorVacanciesPageActions,
  reducer: curatorVacanciesPageReducer,
} = curatorVacanciesPageSlice;
