import { onlyRoles } from "@/HOCs/onlyRole";
import { VacanciesPersonnelPage } from "./Personnel";
import { UserRole } from "@/types/User";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { CuratorVacanciesPage } from "./Curator";
import { Navigate } from "react-router-dom";

export const VacanciesPage = onlyRoles(
  [UserRole.PERSONNEL, UserRole.CURATOR],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return null;
    }

    if (user.role === UserRole.PERSONNEL) {
      return <VacanciesPersonnelPage />;
    } else if (user.role === UserRole.CURATOR) {
      return <CuratorVacanciesPage />;
    }

    return <Navigate to="/" />;
  }
);
