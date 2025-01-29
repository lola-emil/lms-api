import { number } from "joi";
import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";


const TBL_NAME = "users";
export type User = {
    id: number,
    email: number,
    username: number,
    password: number,

    role_id: number,

    created_at: Date,
    updated_at: Date
};

export default new CrudRepo<User>(TBL_NAME);