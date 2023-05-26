import { TrainDirection, TrainDirectionName } from "@/types/TrainDirection";
import { IVacancy } from "@/types/Vacancy";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false,

  form: {
    position: "",
    description: "",
    direction: TrainDirectionName[TrainDirection.IT_CITY],
    test_task: "",
  },
};

export const curatorDetailedVacancyPageSlice = createSlice({
  name: "curatorDetailedVacancyPageSlice",
  initialState,
  reducers: {
    setIsEditMode: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditing = payload;
    },
    moveToEditMode: (
      state,
      { payload }: PayloadAction<MoveToEditModeParams>
    ) => {
      state.isEditing = true;

      state.form.position = payload.vacancy.name;
      state.form.description = payload.vacancy.description;
      state.form.direction = (TrainDirectionName as any)[
        payload.vacancy.direction.id
      ];
      state.form.test_task = payload.vacancy.test_task?.description || "";
    },

    setPosition: (state, { payload }: PayloadAction<string>) => {
      state.form.position = payload.trimStart();
    },
    setDescription: (state, { payload }: PayloadAction<string>) => {
      state.form.description = payload.trimStart();
    },
    setDirection: (state, { payload }: PayloadAction<string>) => {
      state.form.direction = payload;
    },
    setTestTask: (state, { payload }: PayloadAction<string>) => {
      state.form.test_task = payload.trimStart();
    },
  },
});

export const {
  actions: curatorDetailedVacancyPageActions,
  reducer: curatorDetailedVacancyPageReducer,
} = curatorDetailedVacancyPageSlice;

interface MoveToEditModeParams {
  vacancy: IVacancy;
}
