import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { UserRole } from "@/types/User";

import { Navigate } from "react-router-dom";

export const onlyRoles = (roles: UserRole[], FC: React.FC) => () => {
  const user = useAppSelector(selectAuthUser);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace={true} />;
  }

  return <FC />;
};
