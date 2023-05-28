import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";
import { CuratorStatisticsPage } from "./Curator";

export const StatisticsPage = onlyRoles([UserRole.CURATOR], () => {
  return <CuratorStatisticsPage />;
});
