import { useEffect, useState } from 'react';
import userApi from '../api/userApi';

export const useUsers = (page: number, limit: number) => {
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await userApi.getAll({ page, limit });
        setUsers(response.data.data);
        setTotalCount(response.data.pagination.totalItems);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  return { users, loading, totalCount };
};
