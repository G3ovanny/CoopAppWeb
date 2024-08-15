import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { NEXT_PUBLIC_API_URL } = getEnvVariables();

const coopApi = axios.create({
    baseURL: NEXT_PUBLIC_API_URL,
});

coopApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  coopApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refresh = localStorage.getItem('refresh');
          const { data } = await coopApi.post('api/token/refresh/', { refresh });
          console.log(data)
          localStorage.setItem('token', data.access);
          localStorage.setItem('refresh', data.refresh);
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            return coopApi(originalRequest);
        } catch (refreshError) {
          // Manejar el error de refresh (por ejemplo, forzar logout)
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  export default coopApi;

// import axios from 'axios';
// import { getEnvVariables } from '../helpers/getEnvVariables';

// const { NEXT_PUBLIC_API_URL } = getEnvVariables();

// const coopApi = axios.create({
//     baseURL: NEXT_PUBLIC_API_URL,
// });

// coopApi.interceptors.request.use(
//     config => {
//         // Solo acceder a `localStorage` en el cliente
//         if (typeof window !== 'undefined') {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//         }
//         return config;
//     },
//     error => {
//         // Manejo de errores en la solicitud
//         return Promise.reject(error);
//     }
// );

// coopApi.interceptors.response.use(
//     response => response,
//     error => {
//         // Manejo de errores en la respuesta
//         // Aquí podrías redirigir al usuario a una página de login, mostrar un mensaje, etc.
//         console.error('Error en la solicitud:', error);
//         return Promise.reject(error);
//     }
// );

// export default coopApi;





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
