import { useState } from 'react';
import authApi from '../api/authApi';

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginUserPayload {
  phone_number: string;
  password: string;
}

interface RegisterUserPayload {
  name: string,
  phone_number: string;
  emergency_name: string;
  emergency_number: string;
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

  const loginUser = async (data: LoginUserPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.loginUser(data);
      localStorage.setItem('userToken', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data;
    } catch (error) {
      setError('Incorrect Email Id/Password');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data: RegisterUserPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.registerUser(data);
      return response.data;
    } catch (error) {
      console.log(error);
      setError('Register Failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const OtpConfirmation = async (data: RegisterUserPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.registerUser(data);
      return response.data;
    } catch (error) {
      console.log(error);
      setError('Register Failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    localStorage.removeItem('token');
  };

  return {
    loginUser,
    registerUser,
    login,
    logout,
    loading,
    error,
  };
};
