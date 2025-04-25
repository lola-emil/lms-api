import CrudRepo from "../../../utils/crudrepo";

interface StudentClassLevel {
    id: number; // Primary key, Auto Increment
    class_level_id: number; // Foreign key to the class_levels table
    class_section_id: number; // Foreign key to the class_sections table
    school_year_id: number; // Foreign key to the school_years table
    student_id: number; // Foreign key to the users (student) table
    created_by: number; // Foreign key to the users (who created the record)
    updated_by?: number; // Foreign key to the users (who last updated the record), optional
    created_at: string; // ISO string format for the creation date and time
    updated_at: string; // ISO string format for the updated date and time
}


export default new CrudRepo<StudentClassLevel>("student_class_levels");