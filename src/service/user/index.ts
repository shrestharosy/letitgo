import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { IUser } from './user.type';

// TODO
const fetchUserProfile = async () => {
    const response: AxiosResponse<{}> = await axiosInstance.get(`/user/`);
    return response.data;
};

const fetchUserById = async (id: number) => {
    const response: AxiosResponse<IUser> = await axiosInstance.get(
        `/users/${id}/`
    );
    return response.data;
};

export const userService = {
    fetchUserProfile,
    fetchUserById,
};
