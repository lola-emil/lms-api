import CrudRepo from "../utils/crudrepo";



export type Subject = {
    id: number,

    grade_level_id: number,
    subject_name: string,

    creatd_at: string,
    updated_at: string
};


export default new CrudRepo<Subject>("subjects");