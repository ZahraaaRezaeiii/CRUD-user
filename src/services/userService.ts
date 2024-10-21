import axios from 'axios';
import { User } from '../types/userTypes';

const API_URL = 'https://67150fc433bc2bfe40b94210.mockapi.io/api/v1/User';

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get(API_URL);
    return response.data.map((user: User, index: number) => ({
        ...user,
        id: user.id || `temp-${index}`
    }));
};

export const addUser = async (user: { name: string; age?: string; country?: string }): Promise<User> => {
    const response = await axios.post(API_URL, user);
    return response.data;
};

export const updateUser = async (id: string, user: { name: string; age?: string; country?: string }): Promise<User> => {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
