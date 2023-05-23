
export enum Role {
  ADMIN,
  USER
}

export interface User {
  access: string;
  refresh: string;
  user_id: number;
  role: Role
}

export type AuthState = {
  isLoggedIn: boolean;
  user: User;
  error?: {field: string, value: string };
};

export type UserCredentials = {
  username: string;
  password: string;
};

export type UserRegister = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  passwordConf: string;
};