import axiosClient from './axiosClient';

interface LoginPayload {
  email: string;
  password: string;
}

const authApi = {
    login: (data: LoginPayload) => {
      return axiosClient.post('/auth/admin', data);
    },

    logout: () => {
        return axiosClient.post('/auth/logout');
    },
};

export default authApi;