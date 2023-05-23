import React from "react";
import { useAppSelector } from "../store";
import { selectAuth } from "../store/auth/selectors";
import { Navigate, Outlet } from "react-router-dom";

export const UnAuthorizedLayout = () => {
  const user = useAppSelector(selectAuth);

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};
