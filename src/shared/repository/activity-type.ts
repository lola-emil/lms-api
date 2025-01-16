import { db } from "../../config/db";

const TBL_NAME = "activity_types";
export type ActivityType = {
    id: number,
    name: string,

    created_at: Date,
    updated_at: Date,
}

export async function find(query: Partial<ActivityType>) {
    const result = await db<ActivityType>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: ActivityType) {
    const result = await db<ActivityType>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<ActivityType>) {
    const result = await db<ActivityType>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<ActivityType>(TBL_NAME).delete().where("id", id);
    return result;
}