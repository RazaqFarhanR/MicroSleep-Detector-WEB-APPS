import axiosClient from './axiosClient';

interface GetAllUsersParams {
  page: number;
  limit: number;
}

const userApi = {
  getAll: ({ page, limit }: GetAllUsersParams) => {
    return axiosClient.get(`/api/users?page=${page}&limit=${limit}`);
  },
};

export default userApi;
