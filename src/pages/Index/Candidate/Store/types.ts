import { IUser } from "@/types/User";

export enum SubmitApplicationStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  NEXT_STAGE = "next_stage",
  APPROVED = "approved",
}

export interface SubmitApplicationStatusInfo {
  status?: SubmitApplicationStatus;
  status_changed_at?: string;

  status_changed_by?: IUser;
  applicant: IUser;

  created_at?: string;
  is_recommended: boolean;
  direction?: number;
}
