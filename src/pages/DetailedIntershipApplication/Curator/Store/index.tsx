import {
  ITraineeProfile,
  TraineeProfileTestStatus,
} from "@/types/TraineeProfile";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cv_score: undefined as number | undefined,

  career_school_username: "",
  career_school_password: "",
  career_school_progress: undefined as number | undefined,

  testing_platform_username: "",
  testing_platform_password: "",
  test_score: undefined as number | undefined,

  test_passed: undefined as boolean | undefined,
};

export const curatorDetailedIntershipApplicationPageSlice = createSlice({
  name: "curatorDetailedIntershipApplicationPageSlice",
  initialState,
  reducers: {
    setCareerSchoolUsername: (state, { payload }: PayloadAction<string>) => {
      state.career_school_username = payload;
    },

    setCareerSchoolPassword: (state, { payload }: PayloadAction<string>) => {
      state.career_school_password = payload;
    },

    setTestingPlatformUsername: (state, { payload }: PayloadAction<string>) => {
      state.testing_platform_username = payload;
    },

    setTestingPlatformPassword: (state, { payload }: PayloadAction<string>) => {
      state.testing_platform_password = payload;
    },

    setCareerSchoolProgress: (
      state,
      { payload }: PayloadAction<number | undefined>
    ) => {
      state.career_school_progress = payload;
    },

    setTestScore: (state, { payload }: PayloadAction<number | undefined>) => {
      state.test_score = payload;
    },

    setCVScore: (state, { payload }: PayloadAction<number | undefined>) => {
      state.cv_score = payload;
    },

    setTestPassed: (state, { payload }: PayloadAction<boolean | undefined>) => {
      state.test_passed = payload;
    },

    getDataFromProfile: (
      state,
      { payload }: PayloadAction<ITraineeProfile>
    ) => {
      state.career_school_username = payload.career_school_username || "";
      state.career_school_password = payload.career_school_password || "";
      state.career_school_progress = payload.progress_career_school;

      state.cv_score = payload.cv_score;
      state.test_score = payload.test_score;

      state.testing_platform_username = payload.testing_platform_username || "";
      state.testing_platform_password = payload.testing_platform_password || "";

      state.test_passed = payload.test_status
        ? payload.test_status === TraineeProfileTestStatus.FAILED
          ? false
          : payload.test_status === TraineeProfileTestStatus.PASSED
          ? true
          : undefined
        : undefined;
    },

    reset: () => {
      return initialState;
    },
  },
});

export const {
  actions: curatorDetailedIntershipApplicationPageActions,
  reducer: curatorDetailedIntershipApplicationPageReducer,
} = curatorDetailedIntershipApplicationPageSlice;
