export enum AppRole {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN",
}

export interface Role {
    roleId: number;
    roleName: AppRole;
}
