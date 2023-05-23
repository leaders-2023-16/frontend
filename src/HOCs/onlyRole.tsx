import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { UserRole } from "@/types/User";

import { Navigate } from "react-router-dom";
import Title from "antd/es/typography/Title";

const hasRole = true;
export const onlyRoles = (roles: UserRole[], FC: React.FC) => () => {
  const user = useAppSelector(selectAuthUser);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (hasRole) {
    return <Title>403 Не для этой роли</Title>;
  }

  return <FC />;
};
