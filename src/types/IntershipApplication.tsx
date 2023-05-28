import { IUser } from "./User";

export enum IntershipApplicationStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  NEXT_STAGE = "next_stage",
  APPROVED = "approved",
  NOT_QUALIFY = "not_qualify",
}

export interface IIntershipApplication {
  status?: IntershipApplicationStatus;
  status_changed_at?: string;

  status_changed_by?: IUser;
  applicant: IUser;

  created_at?: string;
  is_recommended: boolean;
  direction?: number;

  cv_score?: number;
  test_score?: number;
}
