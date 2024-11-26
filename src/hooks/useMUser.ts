import { useState } from 'react';
import userApi from '../api/userApi';

interface EmergencyParams {
  user_id: string,
  name: string,
  phone_number: string
}

export const useMUsers = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const addEmergencyContact = async (data: EmergencyParams) => {
        setLoading(true);
        try {
            const response = await userApi.addEmergencyNumber(data);
            return response.data
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
        }
    return { addEmergencyContact, loading };
};