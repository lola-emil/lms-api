import { db } from "../../config/db";

const TBL_NAME = "learning_materials";
export type LearningMaterial = {
    id: number,
    
    uri: string,

    created_by: number,
    created_at: Date,
    updated_at: Date,
};



export async function find(query: Partial<LearningMaterial>) {
    const result = await db<LearningMaterial>(TBL_NAME).select().where(query);
    return result;
}

export async function insert(data: LearningMaterial) {
    const result = await db<LearningMaterial>(TBL_NAME).insert(data);
    return result;
}

export async function update(id: number | string, data: Partial<LearningMaterial>) {
    const result = await db<LearningMaterial>(TBL_NAME).update(data).where("id", id);
    return result;
}

export async function remove(id: number) {
    const result = await db<LearningMaterial>(TBL_NAME).delete().where("id", id);
    return result;
}