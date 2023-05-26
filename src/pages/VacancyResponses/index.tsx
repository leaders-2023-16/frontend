import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";
import { TraineeVacancyResponsePage } from "./Trainee";

export const VacancyResponsesPage = onlyRoles([UserRole.TRAINEE], () => {
  return <TraineeVacancyResponsePage />;
});
