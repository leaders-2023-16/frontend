import { onlyRoles } from "@/HOCs/onlyRole";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { UserRole } from "@/types/User";
import { TraineeDetailedVacancyResponse } from "./Trainee";
import { MentorDetailedVacancyResponsePage } from "./Mentor";
import { Navigate } from "react-router-dom";
import { CuratorDetailedVacancyResponsePage } from "./Curator";

export const DetailedVacancyResposePage = onlyRoles(
  [UserRole.TRAINEE, UserRole.CURATOR, UserRole.MENTOR],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return <Navigate to="/" />;
    }

    if (user.role === UserRole.TRAINEE) {
      return <TraineeDetailedVacancyResponse />;
    } else if (user.role === UserRole.MENTOR) {
      return <MentorDetailedVacancyResponsePage />;
    } else if (user.role === UserRole.CURATOR) {
      return <CuratorDetailedVacancyResponsePage />;
    }

    return <Navigate to="/" />;
  }
);
