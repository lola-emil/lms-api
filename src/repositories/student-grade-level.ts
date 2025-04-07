import CrudRepo from "../utils/crudrepo";

export type StudentGradeLevel = {
    id: number;

    student_id: number; // user_id 
    school_year_id: number;

    grade_level_id: number;
    grade_section_id: number;

};


export default new CrudRepo<StudentGradeLevel>("student_grade_levels"); 