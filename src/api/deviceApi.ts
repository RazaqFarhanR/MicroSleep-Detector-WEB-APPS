import axiosClient from './axiosClient';

interface GetAllDevicesParams {
  page: number;
  limit: number;
}

const devicesApi = {
  getAll: ({ page, limit }: GetAllDevicesParams) => {
    return axiosClient.get(`/api/devices?page=${page}&limit=${limit}`);
  },
};

export default devicesApi;
