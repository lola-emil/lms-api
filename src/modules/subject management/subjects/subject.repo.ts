import CrudRepo from "../../../utils/crudrepo";



export type Subject = {
    id: number;
    subject_name: string;
    description?: string;
    grade_level_id: number;
    created_at: string;
    updated_at: string;
};

export default new CrudRepo<Subject>("subjects");