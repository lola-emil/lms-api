import CrudRepo from "../utils/crudrepo";


export type ClassSection = {
    id: number,
    level: string,
    section: string,

    // class_level_id: number,

    created_at: string,
    updated_at: string,
};

export default new CrudRepo<ClassSection>("class_sections");