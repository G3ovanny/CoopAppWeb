import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { NEXT_PUBLIC_API_URL } = getEnvVariables();

const coopApi = axios.create({
    baseURL: NEXT_PUBLIC_API_URL,
});

coopApi.interceptors.request.use(
    config => {
        // Solo acceder a `localStorage` en el cliente
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => {
        // Manejo de errores en la solicitud
        return Promise.reject(error);
    }
);

coopApi.interceptors.response.use(
    response => response,
    error => {
        // Manejo de errores en la respuesta
        // Aquí podrías redirigir al usuario a una página de login, mostrar un mensaje, etc.
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
    }
);

export default coopApi;





// import axios from 'axios'
// import { getEnvVariables } from '../helpers/getEnvVariables';


// const { NEXT_PUBLIC_API_URL } = getEnvVariables();

// const coopApi = axios.create({
//     baseURL: NEXT_PUBLIC_API_URL
// });

// coopApi.interceptors.request.use(config => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config
// })

// export default coopApi;


// config.headers = {
//     ...config.headers,
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
// }
