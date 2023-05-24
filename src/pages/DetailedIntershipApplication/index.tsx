import { onlyRoles } from "@/HOCs/onlyRole";
import { CuratorDetailedIntershipApplicationPage } from "./Curator";
import { UserRole } from "@/types/User";

export const DetailedIntershipApplicationPage = onlyRoles(
  [UserRole.CURATOR],
  () => {
    return <CuratorDetailedIntershipApplicationPage />;
  }
);
