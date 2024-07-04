import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables';


const { VITE_API_URL } = getEnvVariables();

const coopApi = axios.create({
    baseURL: VITE_API_URL
});

coopApi.interceptors.request.use(config => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers = {
    //     ...config.headers,
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    // }

    return config
})

export default coopApi;