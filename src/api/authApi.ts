import axiosClient from './axiosClient';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginUserPayload {
  phone_number: string;
  password: string;
}

interface OtpConfirmPayload {
  phone_number: string,
  otp: string
}

interface RegisterUserPayload {
  name: string,
  phone_number: string;
  emergency_name: string;
  emergency_number: string;
  password: string;
}

const authApi = {
    login: (data: LoginPayload) => {
      return axiosClient.post('/auth/admin', data);
    },

    loginUser: (data: LoginUserPayload) => {
      return axiosClient.post('/auth/user', data);
    },

    registerUser: (data: RegisterUserPayload) => {
      return axiosClient.post('/auth/user/register', data);
    },

    OtpConfirmation: (data: OtpConfirmPayload) => {
      return axiosClient.post('/otp/verify-otp', data)
    },

    logout: () => {
        return axiosClient.post('/auth/logout');
    },
};

export default authApi;