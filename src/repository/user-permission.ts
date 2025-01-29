import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "user_permissions";
export type UserPermission = {
    id: number,
    name: string,
    description: string,

    created_at: Date,
    updated_at: Date
}

export default new CrudRepo<UserPermission>(TBL_NAME);