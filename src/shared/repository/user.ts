import { number } from "joi";
import { db } from "../../config/db";


const TBL_NAME = "users";
export type User = {
    id: number,
    email: number,
    username: number,
    password: number,

    createdAt: Date,
    updatedAt: Date
};



export async function find(query: Partial<User>) {
    const result = await db<User>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: User) {
    const result = await db<User>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<User>) {
    const result = await db<User>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<User>(TBL_NAME).delete().where("id", id);
    return result;
}