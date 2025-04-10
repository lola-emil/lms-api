import CrudRepo from "../utils/crudrepo";



export type Assignment = {
    id: number,

    subject_id: number,

    title: string,
    description: string,

    due_date: string,
    created_at: string,
};


export default new CrudRepo<Assignment>("assignments");
