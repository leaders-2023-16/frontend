import { UserRegister } from '../store/auth/types';
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

    async register({ first_name, last_name, password, username }: UserRegister) {
        return axios
            .post('v1/auth/sign-up', {
                username,
                first_name,
                last_name,
                password
            })
            .then((response) => {
                if (response.data.access) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }
}

export default new AuthService();