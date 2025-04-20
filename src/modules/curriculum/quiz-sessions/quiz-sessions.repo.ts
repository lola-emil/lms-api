import CrudRepo from "../../../utils/crudrepo";


export type QuizSession = {
    id: number;
    quiz_id: number;
    student_id: number;

    expires_at: string;

    created_at: string;
    updated_at: string;
};


export default new CrudRepo<QuizSession>("quiz-sessions");