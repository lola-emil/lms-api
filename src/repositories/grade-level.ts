import CrudRepo from "../utils/crudrepo";

export type GradeLevel = {
    id: number,
    grade_level: number,

    created_at: string,
    updated_at: string;
};


export default new CrudRepo<GradeLevel>("grade_levels");