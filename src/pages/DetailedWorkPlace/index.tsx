import { onlyRoles } from "@/HOCs/onlyRole";
import { UserRole } from "@/types/User";
import { CuratorDetailedWorkPlacePage } from "./Curator";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { Navigate } from "react-router-dom";
import { MentorDetailedWorkPlacePage } from "./Mentor";

export const DetailedWorkPlacePage = onlyRoles(
  [UserRole.CURATOR, UserRole.MENTOR],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return <Navigate to="/" />;
    }
    if (user.role === UserRole.CURATOR) {
      return <CuratorDetailedWorkPlacePage />;
    } else if (user.role === UserRole.MENTOR) {
      return <MentorDetailedWorkPlacePage />;
    }

    return <Navigate to="/" />;
  }
);
