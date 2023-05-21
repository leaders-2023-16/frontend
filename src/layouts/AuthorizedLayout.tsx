import React from "react";
import { useAppSelector } from "../store";
import { selectAuth } from "../store/auth/selectors";
import { Navigate, Outlet } from "react-router-dom";

export const AuthorizedLayout = () => {
  const user = useAppSelector(selectAuth);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};
