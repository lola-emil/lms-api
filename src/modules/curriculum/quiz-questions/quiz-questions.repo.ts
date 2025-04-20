import CrudRepo from "../../../utils/crudrepo";



export type QuizQuestion = {
    id: number;
    quiz_id: number;
    question_id: number;

    question_order: number;
};

export default new CrudRepo<QuizQuestion>("quiz_questions");