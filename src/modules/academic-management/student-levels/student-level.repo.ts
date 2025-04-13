/**
 * THIS TABLE IS USED AS STUDENT'S ENROLLMENT
 * 
 */

import CrudRepo from "../../../utils/crudrepo";

export type StudentLevel = {
    id: number;
    grade_level_id: number;
    grade_section_id: number;
    school_year_id: number;

    created_at: string;
    updated_at: string;
}

export default new CrudRepo<StudentLevel>("student_levels");