import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "user_profiles";
export type UserProfile = {
    id: number,
    fname: string,
    mname: string,
    lname: string,

    user_id: number,

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<UserProfile>(TBL_NAME);