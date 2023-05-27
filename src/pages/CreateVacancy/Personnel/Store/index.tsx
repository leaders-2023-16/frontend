import { TrainDirection, TrainDirectionName } from "@/types/TrainDirection";
import { VacancySchedule } from "@/types/Vacancy";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: "",
  description: "",
  direction: TrainDirectionName[TrainDirection.IT_CITY],
  test_task: "",
  mentor: undefined as number | undefined,
  schedule: VacancySchedule.FULL_TIME,
  skills: [] as string[],
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
    setMentor: (state, { payload }: PayloadAction<number>) => {
      state.mentor = payload;
    },
    setSchedule: (state, { payload }: PayloadAction<VacancySchedule>) => {
      state.schedule = payload;
    },
    setSkills: (state, { payload }: PayloadAction<string[]>) => {
      state.skills = payload;
    },

    reset: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  actions: personnelCreateVacancyPageActions,
  reducer: personnelCreateVacancyPageReducer,
} = personnelCreateVacancyPageSlice;
