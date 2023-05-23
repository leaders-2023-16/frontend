import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./auth";
import { traineeProfileApi } from "./traineeProfile";
import { submitApplicationScreenReducer } from "./submitApplicationScreen";
import { submitApplicationScreenApi } from "./submitApplicationScreen/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,

    submitApplicationScreen: submitApplicationScreenReducer,

    [traineeProfileApi.reducerPath]: traineeProfileApi.reducer,
    [submitApplicationScreenApi.reducerPath]:
      submitApplicationScreenApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // redux api
      traineeProfileApi.middleware,
      submitApplicationScreenApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
