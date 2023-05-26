import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";
import { CuratorDetailedVacancyPage } from "./Curator";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { Navigate } from "react-router-dom";

export const DetailedVacancyPage = onlyRoles(
  [UserRole.CURATOR, UserRole.PERSONNEL],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return <Navigate to="/" />;
    }

    if (user.role === UserRole.CURATOR) {
      return <CuratorDetailedVacancyPage />;
    }

    return null;
  }
);
