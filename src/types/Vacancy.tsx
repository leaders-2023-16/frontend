import { IUser } from "./User";

export enum VacancySchedule {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
}

export enum VacancyStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  PUBLISHED = "published",
}

export enum VacancyTestTaskType {
  TEXT = "text",
}

export interface IVacancyTestTask {
  id: string;
  title: string;
  type: VacancyTestTaskType;
  description: string;
}

export interface IVacancyDepartment {
  id: number;
  name: string;
}

export interface IVacancyDirection {
  id: number;
  name: string;
}

export interface IVacancyQualification {
  id: number;
  name: string;
}

export interface IVacancy {
  id: number;
  required_qualifications: IVacancyQualification[];
  name: string;
  description: string;
  direction: IVacancyDirection;
  department: IVacancyDepartment;
  owner: IUser;
  status: VacancyStatus;
  reviewed_by?: IUser;
  mentor?: IUser;
  test_task?: IVacancyTestTask;
  published_at?: string;
  created_at: string;
  schedule?: VacancySchedule;
}
