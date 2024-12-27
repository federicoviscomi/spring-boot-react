import api from "./api";
import { User } from "../types/user";
import { AxiosResponse } from 'axios';

export const getUsers: () => Promise<AxiosResponse<User[]>> = async () =>
    api.get<User[]>("/admin/users");

export const getUser: (
    userId: number,
) => Promise<AxiosResponse<User>> = async (userId: number) =>
        api.get<User>(`/admin/user/${userId}`);
