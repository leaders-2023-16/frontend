import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";
import { TraineeVacancyResponsePage } from "./Trainee";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { MentorVacancyResponsesPage } from "./Mentor";
import { Navigate } from "react-router-dom";

export const VacancyResponsesPage = onlyRoles(
  [UserRole.TRAINEE, UserRole.MENTOR, UserRole.CURATOR],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return <Navigate to="/" />;
    }

    if (user.role === UserRole.TRAINEE) {
      return <TraineeVacancyResponsePage />;
    } else if (user.role === UserRole.MENTOR) {
      return <MentorVacancyResponsesPage />;
    }

    return <Navigate to="/" />;
  }
);
