export enum UserRole {
  CANDIDATE = "F",
  TRAINEE = "T",
  MENTOR = "M",
  PERSONNEL = "P",
  CURATOR = "C",
  ADMIN = "A",
}

export const UserRoleLabel = {
  [UserRole.ADMIN]: "Администратор",
  [UserRole.TRAINEE]: "Стажер",
  [UserRole.MENTOR]: "Ментор",
  [UserRole.PERSONNEL]: "Кадр",
  [UserRole.CURATOR]: "Куратор",
  [UserRole.CANDIDATE]: "Кандидат",
};

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
