import { onlyRoles } from "@/HOCs/onlyRole";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { UserRole } from "@/types/User";
import { Navigate } from "react-router-dom";
import { TraineeWorkPlacesPage } from "./Trainee";
import { CuratorWorkPlacesPage } from "./Curator";
import { MentorWorkPlacesPage } from "./Mentor";

export const WorkPlacesPage = onlyRoles(
  [UserRole.CURATOR, UserRole.TRAINEE, UserRole.MENTOR],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return <Navigate to="/" />;
    }

    if (user.role === UserRole.TRAINEE) {
      return <TraineeWorkPlacesPage />;
    } else if (user.role === UserRole.CURATOR) {
      return <CuratorWorkPlacesPage />;
    } else if (user.role === UserRole.MENTOR) {
      return <MentorWorkPlacesPage />;
    }

    return <Navigate to="/" />;
  }
);
