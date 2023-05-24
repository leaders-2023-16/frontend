import { onlyRoles } from "@/HOCs/onlyRole";
import { PersonnelCreateVacancyPage } from "./Personnel";
import { UserRole } from "@/types/User";

export const CreateVacancyPage = onlyRoles([UserRole.PERSONNEL], () => {
  return <PersonnelCreateVacancyPage />;
});
