import axiosClient from './axiosClient';

const adminApi = {
    me: () => {
      return axiosClient.get('/api/admin/me');
    },
};

export default adminApi;