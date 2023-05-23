import React from "react";
import { useAppSelector } from "../store";
import { selectAuthUser } from "../store/auth/selectors";
import { Navigate, Outlet } from "react-router-dom";

export const AuthorizedLayout = () => {
  const user = useAppSelector(selectAuthUser);
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};
