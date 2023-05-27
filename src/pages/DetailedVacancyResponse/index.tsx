import { onlyRoles } from "@/HOCs/onlyRole";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { UserRole } from "@/types/User";
import { TraineeDetailedVacancyResponse } from "./Trainee";
import { MentorDetailedVacancyResponsePage } from "./Mentor";

export const DetailedVacancyResposePage = onlyRoles(
  [UserRole.TRAINEE, UserRole.CURATOR, UserRole.MENTOR],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return null;
    }

    if (user.role === UserRole.TRAINEE) {
      return <TraineeDetailedVacancyResponse />;
    } else if (user.role === UserRole.MENTOR) {
      return <MentorDetailedVacancyResponsePage />;
    }

    return null;
  }
);
