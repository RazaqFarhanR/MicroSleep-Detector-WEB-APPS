import axiosClient from './axiosClient';

interface GetAllAccidentsParams {
  page: number;
  limit: number;
}

const accidentApi = {
  getAll: ({ page, limit }: GetAllAccidentsParams) => {
    return axiosClient.get(`/api/accidents?page=${page}&limit=${limit}`);
  },
};

export default accidentApi;
