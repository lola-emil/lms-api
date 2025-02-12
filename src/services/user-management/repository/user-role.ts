import CrudRepo from "../../../shared/utils/crudrepo";


const TBL_NAME = "user_roles";
export type UserRole = {
    id: number,
    role_name: string,

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<UserRole>(TBL_NAME);