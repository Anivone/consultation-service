import axios from "axios";

export function initAxiosInterceptors() {
    // Request interceptor
    axios.interceptors.request.use(
        async (config) => {
            config.headers = {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }

            return config;
        }
    )

    // Response interceptor
    axios.interceptors.response.use((response) => {
        if (!response.headers.authorization) return response;

        localStorage.setItem('token', response.headers.authorization.split(' ')[1]);
        return response;
    })

    return axios;
}