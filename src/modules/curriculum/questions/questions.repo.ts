import CrudRepo from "../../../utils/crudrepo";


export type Question = {
    id: number;
    question_text: string;
    subject_id: number;

    created_at: string;
    updated_at: string;
};


export default new CrudRepo<Question>("questions");