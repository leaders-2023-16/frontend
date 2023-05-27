import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";

export const WorkPlacesPage = onlyRoles([UserRole.CURATOR], () => {
  return null;
});
