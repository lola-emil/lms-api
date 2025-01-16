import { db } from "../../config/db";

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


export async function find(query: Partial<UserProfile>) {
    const result = await db<UserProfile>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: UserProfile) {
    const result = await db<UserProfile>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<UserProfile>) {
    const result = await db<UserProfile>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<UserProfile>(TBL_NAME).delete().where("id", id);
    return result;
}