import { User } from "../store/auth/types";

class TokenService {
  getLocalRefreshToken() {
    const user = this.getUser();
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = this.getUser();
    return user?.accessToken;
  }

  updateLocalRefreshToken(token: string) {
    const user = this.getUser();
    user.refreshToken = token;
    this.setUser(user);
  }

  updateLocalAccessToken(token: string) {
    const user = this.getUser();
    user.accessToken = token;
    this.setUser(user);
  }

  getUser() {
    const userJson = localStorage.getItem('user');
    const user = (userJson !== null ? JSON.parse(userJson) : {}) as User;
    return user;
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }
}

export default new TokenService();