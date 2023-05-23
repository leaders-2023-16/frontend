export enum Role {
  ADMIN,
  USER,
}

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
