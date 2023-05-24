import TokenService from "./tokenService";
import { http as axios } from "./axios";
import { Store } from "@reduxjs/toolkit";
import { authActions } from "@/store/auth";

const setup = (store: Store) => {
    axios.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
                //config.headers['x-access-token'] = token; // for Node.js Express back-end
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const { dispatch } = store;

    // const { dispatch } = store;
    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== '/auth/signin' && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const token = TokenService.getLocalRefreshToken();
                        const rs = await axios.post('v1/auth/refresh', { refresh: token });
                        // dispatch(authActions.refreshToken(rs.data));
                        TokenService.updateLocalAccessToken(rs.data.access);
                        TokenService.updateLocalRefreshToken(rs.data.refresh);

                        return axios(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
};

export default setup;
