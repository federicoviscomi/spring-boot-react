import api from "./api";
import { AxiosResponse } from "axios";
import { Role } from "../types/role";

export const getRoles: () => Promise<AxiosResponse<Role[]>> = async () =>
    api.get<Role[]>("/admin/roles");

export interface UpdateRoleRequest {
    userId: number;
    roleId: number;
}

export const updateRole: (
    updateRoleRequest: UpdateRoleRequest,
) => Promise<AxiosResponse<string>> = async (
    updateRoleRequest: UpdateRoleRequest,
) =>
        api.put<string>("/admin/update-role", updateRoleRequest, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
