import CrudRepo from "../utils/crudrepo";


export type UserRolePermission = {
    id: number,
    role_id: number,
    resource: string,
    permission: "GET" | "PATCH" | "DELETE" | "POST",

    created_at: string,
    updated_at: string,
};

export default new CrudRepo<UserRolePermission>("user_role_permissions");