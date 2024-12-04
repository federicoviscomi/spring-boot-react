import api from "./api";
import { User } from "../types/user";

export const getUsers = async () => {
  return await api.get<User[]>("/admin/getusers");
};
