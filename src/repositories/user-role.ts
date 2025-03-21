import CrudRepo from "../utils/crudrepo";


export type UserRole = {
    id: number,

    name: string,
    description: string,

    created_at: string,
    updated_at: string,
};


export default new CrudRepo<UserRole>("user_roles");