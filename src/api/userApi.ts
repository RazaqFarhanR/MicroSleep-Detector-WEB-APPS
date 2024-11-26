import axiosClient from './axiosClient';

interface GetAllUsersParams {
  page: number;
  limit: number;
}

interface EmergencyParams {
  user_id: string,
  name: string,
  phone_number: string
}

const userApi = {
  getAll: ({ page, limit }: GetAllUsersParams) => {
    return axiosClient.get(`/api/users?page=${page}&limit=${limit}`);
  },
  addEmergencyNumber: (data: EmergencyParams) => {
    return axiosClient.post('/api/users/emergency_contact', data)
  }
};

export default userApi;
