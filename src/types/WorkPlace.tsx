import { IDepartment } from "./Department";
import { IUser } from "./User";
import { IVacancy } from "./Vacancy";

export interface IWorkPlace {
  id: number;
  name: string;
  mentor: IUser;
  trainee: IUser;
  vacancy: IVacancy;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  department: IDepartment;
}
