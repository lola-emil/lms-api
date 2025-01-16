import { db } from "../../config/db";

const TBL_NAME = "acitvity_submissions";
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


export async function find(query: Partial<ActivitySubmission>) {
    const result = await db<ActivitySubmission>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: ActivitySubmission) {
    const result = await db<ActivitySubmission>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<ActivitySubmission>) {
    const result = await db<ActivitySubmission>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<ActivitySubmission>(TBL_NAME).delete().where("id", id);
    return result;
}