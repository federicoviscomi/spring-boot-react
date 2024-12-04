import api from "./api";
import { User } from "../types/user";

export const getUsers = async () => api.get<User[]>("/admin/users");

export const getUser = async (userId: number) =>
  api.get(`/admin/user/${userId}`);
