import { db } from "../../config/db";

const TBL_NAME = "user_roles";
export type UserRole = {
    id: number,
    name: string,

    createdAt: Date,
    updatedAt: Date,
};


export async function find(query: Partial<UserRole>) {
    const result = await db<UserRole>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: UserRole) {
    const result = await db<UserRole>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<UserRole>) {
    const result = await db<UserRole>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<UserRole>(TBL_NAME).delete().where("id", id);
    return result;
}

