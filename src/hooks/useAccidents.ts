import { useEffect, useState } from 'react';
import accidentApi from '../api/accidentApi';

export const useAccidents = (page: number, limit: number) => {
  const [accident, setAccident] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchDevice = async () => {
      setLoading(true);
      try {
        const response = await accidentApi.getAll({ page, limit });
        setAccident(response.data.data);
        setTotalCount(response.data.pagination.totalItems);
      } catch (error) {
        console.error("Failed to fetch Devices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [page, limit]);

  return { accident, loading, totalCount };
};
