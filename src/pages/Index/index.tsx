import { useAppSelector } from "@/store";
import { CandidateIndexPage } from "./Candidate";

import { Navigate } from "react-router-dom";
import { selectAuthUser } from "@/store/auth/selectors";
import { UserRole } from "@/types/User";

export const IndexPage = () => {
  const user = useAppSelector(selectAuthUser);

  const isCandidate = user?.role === UserRole.CANDIDATE;
  const isPersonnel = user?.role === UserRole.PERSONNEL;
  const isCurator = user?.role === UserRole.CURATOR;
  const isTrainee = user?.role === UserRole.TRAINEE;
  const isMentor = user?.role === UserRole.MENTOR;

  if (isCandidate) {
    return <CandidateIndexPage />;
  } else if (isPersonnel) {
    return <Navigate to="/create-vacancy" replace={true} />;
  } else if (isCurator) {
    return <Navigate to="/intership-applications" replace={true} />;
  } else if (isTrainee) {
    return <Navigate to="/vacancies" replace={true} />;
  } else if (isMentor) {
    return <Navigate to="/vacancy-responses" replace={true} />;
  } else {
    return null;
  }
};
