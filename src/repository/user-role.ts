import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "user_roles";
export type UserRole = {
    id: number,
    name: string,

    user_permission_id: number,

    created_at: Date,
    updated_at: Date,
};


export default new CrudRepo<UserRole>(TBL_NAME);