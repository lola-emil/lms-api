import CrudRepo from "../../../utils/crudrepo";


export type Quiz = {
    id: number;
    quiz_title: string;

    subject_id: number;
    teacher_subject_id: number;

    created_at: string;
    updated_at: string;
};


export default new CrudRepo<Quiz>("quizzes");