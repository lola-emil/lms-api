import CrudRepo from "../../../utils/crudrepo";


export type UserRole = {
    id: number,
    role_name: string,
};


export default new CrudRepo<UserRole>("user_roles");