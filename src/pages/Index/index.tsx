import { useAppSelector } from "@/store";
import { CandidateIndexPage } from "./Candidate";

import { Navigate } from "react-router-dom";
import { selectAuthUser } from "@/store/auth/selectors";
import { UserRole } from "@/types/User";

export const IndexPage = () => {
  const user = useAppSelector(selectAuthUser);

  const isCandidate = user?.role === UserRole.CANDIDATE;
  const isPersonnel = user?.role === UserRole.PERSONNEL;

  if (isCandidate) {
    return <CandidateIndexPage />;
  } else if (isPersonnel) {
    return <Navigate to="/create-vacancy" replace={true} />;
  } else {
    return null;
  }
};
