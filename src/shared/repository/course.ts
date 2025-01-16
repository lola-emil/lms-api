import { db } from "../../config/db";

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



export async function find(query: Partial<Course>) {
    const result = await db<Course>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: Course) {
    const result = await db<Course>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<Course>) {
    const result = await db<Course>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<Course>(TBL_NAME).delete().where("id", id);
    return result;
}