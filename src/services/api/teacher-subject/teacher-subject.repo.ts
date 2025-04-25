import CrudRepo from "../../../utils/crudrepo";

export interface TeacherSubject {
    id: number;
    subject_id: number;
    teacher_id: number;
    school_year_id: number;

    created_by: number;
    updated_by?: number;

    created_at: string; // ISO string format of datetime
    updated_at: string; // ISO string format of datetime
}


export default new CrudRepo<TeacherSubject>("teacher_subjects");