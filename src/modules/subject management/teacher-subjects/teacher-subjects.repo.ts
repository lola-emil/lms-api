import CrudRepo from "../../../utils/crudrepo";


export type TeacherSubject = {
    id: number,
    teacher_id: number;
    grade_level_id: number;
    grade_section_id: number;
    subject_id: number;
    school_year_id: number;

    created_at: string;
    updated_at: string;
};

export default new CrudRepo<TeacherSubject>("teacher_subjects");