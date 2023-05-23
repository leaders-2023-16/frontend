import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import { selectAuth } from "../store/auth/selectors";
import { history } from "../helpers/history";
import { Role } from "../store/auth/types";

export const PrivateRoute = ({ admin }: { admin?: boolean }) => {
  const { isLoggedIn, user } = useAppSelector(selectAuth);
  //   if (!isLoggedIn) {
  //     // not logged in so redirect to login page with the return url
  //     return <Navigate to="/login" state={{ from: history.location }} />;
  //   }

  //   if (admin && user?.role !== Role.ADMIN) {
  //     return <Navigate to="/" state={{ from: history.location }} />;
  //   }

  return <Outlet />;
};
