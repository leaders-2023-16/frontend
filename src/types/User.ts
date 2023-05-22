export enum UserRole {
  F = "F",
  T = "T",
  M = "M",
  P = "P",
  C = "C",
  A = "A",
}

export interface IUserDepartment {
  id: number;
  name: string;
}

export interface IUser {
  email: string;
  role: UserRole;

  first_name: string;
  last_name: string;

  department: IUserDepartment;
}
