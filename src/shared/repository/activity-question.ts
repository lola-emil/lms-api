import { db } from "../../config/db";

const TBL_NAME = "activity_questions";
export type ActivityQuestion = {
    id: number,

    activity_id: number,
    question_text: string,
    question_type: number,

    options: string, // JSON ni siya para sa mga choices
    correct_answer: string, // JSON gihapon

    points: number,
    order: number,

    created_at: Date,
    updated_at: Date,
};


export async function find(query: Partial<ActivityQuestion>) {
    const result = await db<ActivityQuestion>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: ActivityQuestion) {
    const result = await db<ActivityQuestion>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<ActivityQuestion>) {
    const result = await db<ActivityQuestion>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<ActivityQuestion>(TBL_NAME).delete().where("id", id);
    return result;
}