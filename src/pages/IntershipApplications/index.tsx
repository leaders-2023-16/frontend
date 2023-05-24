import { onlyRoles } from "@/HOCs/onlyRole";
import { CuratorIntershipApplicationsPage } from "./Curator";
import { UserRole } from "@/types/User";

export const IntershipApplicationsPage = onlyRoles([UserRole.CURATOR], () => {
  return <CuratorIntershipApplicationsPage />;
});
