import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

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


export default new CrudRepo<ActivityQuestion>(TBL_NAME);