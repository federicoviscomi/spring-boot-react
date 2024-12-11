import api from "./api";
import axios from "axios";
import {Role} from "../types/role";

export const getRoles: () => Promise<axios.AxiosResponse<Role[]>> = async () =>
    api.get<Role[]>("/admin/roles");

export interface UpdateRoleRequest {
    userId: number;
    roleId: number;
}

export const updateRole: (
    updateRoleRequest: UpdateRoleRequest,
) => Promise<axios.AxiosResponse<string>> = async (
    updateRoleRequest: UpdateRoleRequest,
) =>
    api.put<string>("/admin/update-role", updateRoleRequest, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
