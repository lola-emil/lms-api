import CrudRepo from "../../../utils/crudrepo";



export type Answer = {
    id: number;
    answer_text: string;
    question_id: number;

    is_correct: boolean;
};


export default new CrudRepo<Answer>("answers");