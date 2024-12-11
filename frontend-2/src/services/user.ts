import api from "./api";
import {User} from "../types/user";
import axios from "axios";

export const getUsers: () => Promise<axios.AxiosResponse<User[]>> = async () =>
    api.get<User[]>("/admin/users");

export const getUser: (
    userId: number,
) => Promise<axios.AxiosResponse<User>> = async (userId: number) =>
    api.get<User>(`/admin/user/${userId}`);
