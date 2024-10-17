import { useCallback, useState } from 'react';
import adminApi from '../api/adminApi';

export const useAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const me = useCallback (async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminApi.me();
      return response.data.data;
    } catch (error:any) {
        setError(error.response?.data?.message || 'Failed to fetch user information');
        throw error;
      } finally {
        setLoading(false);
      }
  },[])

  return {
    me,
    loading,
    error,
  };
};
