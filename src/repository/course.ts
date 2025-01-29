import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "courses";
export type Course = {
    id: number,

    code: string,
    title: string,
    description: string,

    created_by: number, // foreign key user table
    created_at: Date,
    updated_at: Date
}

export default new CrudRepo<Course>(TBL_NAME);