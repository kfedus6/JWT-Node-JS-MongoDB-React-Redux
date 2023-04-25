import axios from 'axios'

const $host = axios.create({
    withCredentials: true,
    credentials: 'include',
    baseURL: process.env.REACT_APP_API_URL
})

$host.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$host.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            return $host.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $host;