import React from "react";
import { useAppSelector } from "../store";
import { selectAuthUser } from "../store/auth/selectors";
import { Navigate, Outlet } from "react-router-dom";

export const UnAuthorizedLayout = () => {
  const user = useAppSelector(selectAuthUser);

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};
