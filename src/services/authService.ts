import { http as axios } from './axios';
import TokenService from './tokenService';

class AuthService {
    async login(username: string, password: string) {
        return axios
            .post('v1/auth/sign-in', {
                username,
                password
            })
            .then((response) => {
                if (response.data.access) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
    }

    async register(username: string, email: string, password: string) {
        return axios
            .post('v1/auth/sign-up', {
                username,
                email,
                password
            })
            .then((response) => {
                return response.data;
            });
    }
}

export default new AuthService();