import { db } from "../../config/db";

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


export async function find(query: Partial<Activity>) {
    const result = await db<Activity>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: Activity) {
    const result = await db<Activity>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<Activity>) {
    const result = await db<Activity>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<Activity>(TBL_NAME).delete().where("id", id);
    return result;
}