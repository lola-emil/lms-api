import CrudRepo from "../utils/crudrepo";


export type GradeSection = {
    id: number,

    grade_level_id: number,
    section_name: string,

    created_at: string,
    updated_at: string,
};


export default new CrudRepo<GradeSection>("grade_sections");