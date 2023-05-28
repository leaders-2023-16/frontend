import { IUser, IUserDepartment } from "./User";
import { IQualification, IDirection } from "./commonTypes";

export enum EStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  PUBLISHED = "published",
}

export enum ETestTaskType {
  TEXT = "text",
}

export type ITestTask = {
  id: number;
  title: string;
  type: ETestTaskType;
  description: string;
};

export type IVacancy = {
  id: number;
  required_qualifications: IQualification;
  name: string;
  description: string;
  direction: IDirection;
  department: IUserDepartment;
  owner: IUser;
  status: EStatus;
  reviewed_by: IUser;
  mentor: IUser;
  test_task: ITestTask;
  published_at: string;
  created_at: string;
};
