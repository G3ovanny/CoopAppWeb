import { coopApi } from '@/app/api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '@/app/store/auth/authSlice';
import { RootState } from '@/app/store/store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refresh: string;
  usuario: {
    username: string;
    id: number;
    nombre: string;
  };
}

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ username, password }: LoginCredentials) => {
    dispatch(onChecking());
    try {
      const { data } = await coopApi.post('/loging/', { username, password });
      console.log(data)
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      localStorage.setItem('username', data.usuario.username);
      dispatch(onLogin({ name: data.usuario.nombre, id: data.usuario.id }));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000);
    }
  };

  const checkAuthToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');

    if (!token || !refresh) {
      dispatch(onLogout());
      return;
    }

    try {
      const { data } = await coopApi.post<LoginResponse>('api/token/refresh/', { refresh });
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      dispatch(onLogin({ name: data.usuario.nombre, id: data.usuario.id }));
    } catch (error) {
      console.error('Error refreshing token:', error);
      localStorage.clear();
      dispatch(onLogout());
    }
  }, [dispatch]);

  const startLogout = useCallback(() => {
    localStorage.clear();
    dispatch(onLogout());
  }, [dispatch]);

  return {
    // Métodos
    startLogin,
    startLogout,
    checkAuthToken,
    // Propiedades
    errorMessage,
    status,
    user
  };
};
