import { TrainDirection, TrainDirectionName } from "@/types/TrainDirection";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: "",
  description: "",
  direction: TrainDirectionName[TrainDirection.IT_CITY],
  test_task: "",
};

export const personnelCreateVacancyPageSlice = createSlice({
  name: "personnelCreateVacancyPage",
  initialState,
  reducers: {
    setPosition: (state, { payload }: PayloadAction<string>) => {
      state.position = payload.trimStart();
    },
    setDescription: (state, { payload }: PayloadAction<string>) => {
      state.description = payload.trimStart();
    },
    setDirection: (state, { payload }: PayloadAction<string>) => {
      state.direction = payload;
    },
    setTestTask: (state, { payload }: PayloadAction<string>) => {
      state.test_task = payload.trimStart();
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  actions: personnelCreateVacancyPageActions,
  reducer: personnelCreateVacancyPageReducer,
} = personnelCreateVacancyPageSlice;
