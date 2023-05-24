import { RootState } from "..";

export const selectAuth = (state: RootState) => state.auth;
export const selectUserId = (state: RootState) => state.auth.user?.id
export const selectAuthUser = (state: RootState) => state.auth.user;
