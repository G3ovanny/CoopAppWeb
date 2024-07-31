import { coopApi } from '@/app/api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '@/app/store/auth/authSlice';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface LoginCredentials {
  username: string;
  password: string;
}

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ username, password }: LoginCredentials) => {
    dispatch(onChecking());
    try {
      const { data } = await coopApi.post('/loging/', { username, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      localStorage.setItem('username', data.usuario.username);
      dispatch(onLogin({ name: data.nombre, id: data.id }));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000);
    }
  };


  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh')

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await coopApi.post('api/token/refresh/', { refresh });
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('token-init-date', String(new Date().getTime()));
      dispatch(onLogin({ name: data.nombre, id: data.id }))
    } catch (error) {
      console.log(error)
      localStorage.clear();
      dispatch(onLogout());
    }
  }


  const startLogout = useCallback(() => {
    localStorage.clear();
    dispatch(onLogout());
  }, [dispatch]);

  return {
    // Métodos
    startLogin,
    startLogout,
    // Propiedades
    errorMessage,
    status,
    user
  };
};
