import CrudRepo from "../utils/crudrepo";



export type ClassLevel = {
    id: number,
    name: string,

    created_at: string,
    updated_at: string,
};


export default new CrudRepo<ClassLevel>("class_level");