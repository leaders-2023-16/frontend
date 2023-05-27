import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";
import { CuratorAcceptedApplicationsPage } from "./Curator";

export const AcceptedApplicationsPage = onlyRoles([UserRole.CURATOR], () => {
  return <CuratorAcceptedApplicationsPage />;
});
