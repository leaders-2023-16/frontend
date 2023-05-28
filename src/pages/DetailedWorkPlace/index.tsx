import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";
import { CuratorDetailedWorkPlacePage } from "./Curator";

export const DetailedWorkPlacePage = onlyRoles([UserRole.CURATOR], () => {
  return <CuratorDetailedWorkPlacePage />;
});
