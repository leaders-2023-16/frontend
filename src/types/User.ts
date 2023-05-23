export enum UserRole {
  CANDIDATE = "F",
  TRAINEE = "T",
  MENTOR = "M",
  PERSONNEL = "P",
  CURATOR = "C",
  ADMIN = "A",
}

export interface IUserDepartment {
  id: number;
  name: string;
}

export interface IUser {
  id: number;

  email?: string;
  role: UserRole;

  first_name?: string;
  last_name?: string;

  department?: IUserDepartment;
}
