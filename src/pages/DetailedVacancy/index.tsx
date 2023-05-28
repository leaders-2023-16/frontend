import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";
import { CuratorDetailedVacancyPage } from "./Curator";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { Navigate } from "react-router-dom";
import { TraineeDetailedVacancyPage } from "./Trainee";
import { PersonnelDetailedVacancyPage } from "./Personnel";

export const DetailedVacancyPage = onlyRoles(
  [UserRole.CURATOR, UserRole.PERSONNEL, UserRole.TRAINEE],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return <Navigate to="/" />;
    }

    if (user.role === UserRole.CURATOR) {
      return <CuratorDetailedVacancyPage />;
    } else if (user.role === UserRole.TRAINEE) {
      return <TraineeDetailedVacancyPage />;
    } else if (user.role === UserRole.PERSONNEL) {
      return <PersonnelDetailedVacancyPage />;
    }

    return <Navigate to="/" />;
  }
);
