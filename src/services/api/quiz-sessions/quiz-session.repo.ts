import CrudRepo from "../../../utils/crudrepo";

export interface QuizSession {
    id: number;
    student_id: number;
    
    quiz_id: number,
    score: number,
    hps: number,

    created_at: string;
    updated_at: string;
}


export default new CrudRepo<QuizSession>("quiz_sessions");