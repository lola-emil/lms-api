import { db } from "../../config/db";

const TBL_NAME = "user_permissions";
export type UserPermission = {
    id: number,
    name: string,
    description: string,

    createdAt: Date,
    updatedAt: Date
}


export async function find(query: Partial<UserPermission>) {
    const result = await db<UserPermission>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: UserPermission) {
    const result = await db<UserPermission>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<UserPermission>) {
    const result = await db<UserPermission>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<UserPermission>(TBL_NAME).delete().where("id", id);
    return result;
}