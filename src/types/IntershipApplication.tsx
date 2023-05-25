import { IUser } from "./User";

export enum IntershipApplicationStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  NEXT_STAGE = "next-stage",
  APPROVED = "approved",
}

export interface IIntershipApplication {
  _id: number;

  status?: IntershipApplicationStatus;
  status_changed_at?: string;

  status_changed_by?: IUser;
  applicant: IUser;

  created_at?: string;
  is_recommended: boolean;
  direction?: number;
}
