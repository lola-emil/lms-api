import CrudRepo from "../../../shared/utils/crudrepo";


const TBL_NAME = "user_roles";
export type UserRoles = {
    id: number,
    role_name: string,

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<UserRoles>(TBL_NAME);