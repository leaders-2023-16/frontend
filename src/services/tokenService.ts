import { IUser } from "@/types/User";

export interface IUserWithCreds {
  access: string;
  refresh: string;
  user: IUser;
}

class TokenService {
  getLocalRefreshToken() {
    const user = this.getUser();
    return user?.refresh;
  }

  getLocalAccessToken() {
    const user = this.getUser();
    return user?.access;
  }

  updateLocalRefreshToken(token: string) {
    const user = this.getUser();
    user.refresh = token;
    this.setUser(user);
  }

  updateLocalAccessToken(token: string) {
    const user = this.getUser();
    user.access = token;
    this.setUser(user);
  }

  getUser() {
    const userJson = localStorage.getItem("user");
    const user = (
      userJson !== null ? JSON.parse(userJson) : {}
    ) as IUserWithCreds;
    return user;
  }

  setUser(user: IUserWithCreds) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
