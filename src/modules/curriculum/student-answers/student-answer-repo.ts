import CrudRepo from "../../../utils/crudrepo";


export type StudentAnswer = {
    id: number;
    quiz_session_id: number;
    question_id: number;
    answer_id: number;
};

export default new CrudRepo<StudentAnswer>("student_answers");