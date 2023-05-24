import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./auth";
import { traineeProfileApi } from "./traineeProfile";
import { candidateIndexPageReducer } from "@/pages/Index/Candidate/Store";
import { intershipApplicationsApi } from "./intershipApplications/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,

    candidateIndexPage: candidateIndexPageReducer,

    [traineeProfileApi.reducerPath]: traineeProfileApi.reducer,
    [intershipApplicationsApi.reducerPath]: intershipApplicationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // redux api
      traineeProfileApi.middleware,
      intershipApplicationsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
