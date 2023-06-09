import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./auth";
import { traineeProfileApi } from "./traineeProfile";
import { candidateIndexPageReducer } from "@/pages/Index/Candidate/Store";
import { intershipApplicationsApi } from "./intershipApplications/api";
import { dictionaryApi } from "./dictionary";
import { vacanciesApi } from "./vacancies/api";
import { personnelCreateVacancyPageReducer } from "@/pages/CreateVacancy/Personnel/Store";
import { curatorDetailedVacancyPageReducer } from "@/pages/DetailedVacancy/Curator/Store";
import { vacancyResponsesApi } from "./vacancyResponse/api";
import { traineeDetailedVacancyPageReducer } from "@/pages/DetailedVacancy/Trainee/Store";
import { personnelDetailedVacancyPageReducer } from "@/pages/DetailedVacancy/Personnel/Store";
import { usersApi } from "./users/api";
import { curatorDetailedIntershipApplicationPageReducer } from "@/pages/DetailedIntershipApplication/Curator/Store";
import { curatorInternshipApplicationPageReducer } from "@/pages/IntershipApplications/Curator/Store";
import { workPlacesApi } from "./workPlace/api";
import { curatorWorkPlacesPageReducer } from "@/pages/WorkPlaces/Curator/Store";
import { curatorVacanciesPageReducer } from "@/pages/Vacancies/Curator/Store";
import { traineeWorkPlacesPageReducer } from "@/pages/WorkPlaces/Trainee/Store";
import { reportsApi } from "./reports/api";
import { mentorDetailedWorkPlacePageReducer } from "@/pages/DetailedWorkPlace/Mentor/Store";
import { feedbacksApi } from "./feedbacks/api";
import { statisticsApi } from "./statistics/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,

    candidateIndexPage: candidateIndexPageReducer,
    personnelCreateVacancyPage: personnelCreateVacancyPageReducer,
    curatorDetailedVacancyPage: curatorDetailedVacancyPageReducer,
    traineeDetailedVacancyPage: traineeDetailedVacancyPageReducer,
    personnelDetailedVacancyPage: personnelDetailedVacancyPageReducer,
    curatorDetailedIntershipApplicationPage:
      curatorDetailedIntershipApplicationPageReducer,
    curatorInternshipApplicationPage: curatorInternshipApplicationPageReducer,
    curatorWorkPlacesPage: curatorWorkPlacesPageReducer,
    curatorVacanciesPage: curatorVacanciesPageReducer,
    traineeWorkPlacesPage: traineeWorkPlacesPageReducer,
    mentorDetailedWorkPlacePage: mentorDetailedWorkPlacePageReducer,

    [dictionaryApi.reducerPath]: dictionaryApi.reducer,
    [traineeProfileApi.reducerPath]: traineeProfileApi.reducer,
    [intershipApplicationsApi.reducerPath]: intershipApplicationsApi.reducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
    [vacancyResponsesApi.reducerPath]: vacancyResponsesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [workPlacesApi.reducerPath]: workPlacesApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    [feedbacksApi.reducerPath]: feedbacksApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // redux api
      traineeProfileApi.middleware,
      intershipApplicationsApi.middleware,
      dictionaryApi.middleware,
      vacanciesApi.middleware,
      vacancyResponsesApi.middleware,
      usersApi.middleware,
      workPlacesApi.middleware,
      reportsApi.middleware,
      feedbacksApi.middleware,
      statisticsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
