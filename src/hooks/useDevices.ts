import { useEffect, useState } from 'react';
import devicesApi from '../api/deviceApi';

export const useDevices = (page: number, limit: number) => {
  const [devices, setDevices] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchDevice = async () => {
      setLoading(true);
      try {
        const response = await devicesApi.getAll({ page, limit });
        setDevices(response.data.data);
        setTotalCount(response.data.pagination.totalItems);
      } catch (error) {
        console.error("Failed to fetch Devices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [page, limit]);

  return { devices, loading, totalCount };
};
