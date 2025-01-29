import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "activities";
export type Activity = {
    id: number,
    title: string,
    description: string,

    due_date: Date,
    start_date: Date,
    end_date: Date,

    max_score: number,
    passing_score: number,

    is_published: boolean,

    course_id: number,

    activity_type_id: number,


    created_by: number,

    created_at: Date,
    updated_at: Date,
}

export default new CrudRepo<Activity>(TBL_NAME);