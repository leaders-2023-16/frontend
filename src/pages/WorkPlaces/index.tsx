import { onlyRoles } from "@/HOCs/onlyRole";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { UserRole } from "@/types/User";
import { Navigate } from "react-router-dom";
import { TraineeWorkPlacesPage } from "./Trainee";
import { CuratorWorkPlacesPage } from "./Curator";

export const WorkPlacesPage = onlyRoles(
  [UserRole.CURATOR, UserRole.TRAINEE],
  () => {
    const user = useAppSelector(selectAuthUser);

    if (!user) {
      return <Navigate to="/" />;
    }

    if (user.role === UserRole.TRAINEE) {
      return <TraineeWorkPlacesPage />;
    } else if (user.role === UserRole.CURATOR) {
      return <CuratorWorkPlacesPage />;
    }

    return <Navigate to="/" />;
  }
);
