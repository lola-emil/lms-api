import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "activity_submissions";
export type ActivitySubmission = {
    id: number,
    activity_id: number,
    user_id: number,

    submitted_at: Date,
    score: number,

    attachments: string,

    status: "submitted" | "graded" | "late",

    created_at: Date,
    updated_at: Date
};

export default new CrudRepo<ActivitySubmission>(TBL_NAME);