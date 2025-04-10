import CrudRepo from "../utils/crudrepo";


export type AssignmentSubmission = {
    id: number,

    student_id: number,
    assignment_id: number,

    created_at: string
};


export default new CrudRepo<AssignmentSubmission>("assignment_submissions");