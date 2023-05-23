import { CandidateIndexPage } from "./Candidate";

import { Navigate } from "react-router-dom";

export const IndexPage = () => {
  const isCandidate = false;
  const isPersonnel = true;

  if (isCandidate) {
    return <CandidateIndexPage />;
  } else if (isPersonnel) {
    return <Navigate to="/create-vacancy" replace={true} />;
  } else {
    return null;
  }
};
