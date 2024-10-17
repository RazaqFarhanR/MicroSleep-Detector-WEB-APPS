import { useState } from 'react';
import authApi from '../api/authApi';

interface LoginPayload {
    email: string;
    password: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(data);
      localStorage.setItem('token', response.data.data.token);
    //   localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (error) {
        setError('Incorrect Email Id/Password');
        throw error;
      } finally {
        setLoading(false);
      }
  };

  const logout = () => {
    authApi.logout();
    localStorage.removeItem('token');
    // localStorage.removeItem('refreshToken');
  };

  return {
    login,
    logout,
    loading,
    error,
  };
};
