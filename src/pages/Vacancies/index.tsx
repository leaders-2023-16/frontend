import { onlyRoles } from "@/HOCs/onlyRole";
import { VacanciesPersonnelPage } from "./Personnel";
import { UserRole } from "@/types/User";

export const VacanciesPage = onlyRoles(
  [UserRole.PERSONNEL, UserRole.CURATOR],
  () => {
    return <VacanciesPersonnelPage />;
  }
);
