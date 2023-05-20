
export enum Role {
  ADMIN,
  USER
}

export interface User {
  access: string;
  refresh: string;
  role: Role
}

export type AuthState = {
  isLoggedIn: boolean;
  user: User;
  error: string;
};

export type UserCredentials = {
  username: string;
  password: string;
};

export type UserRegister = {
  username: string;
  email: string;
  password: string;
  passwordConf: string;
};