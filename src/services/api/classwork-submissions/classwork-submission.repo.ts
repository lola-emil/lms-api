import CrudRepo from "../../../utils/crudrepo";

export interface ClassworkSubmission {
    id: number;
    classwork_id: number;
    comment: string;
    student_id: number;
    created_at: string; // or Date
}

export default new CrudRepo<ClassworkSubmission>("classwork_submissions");