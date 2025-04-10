import CrudRepo from "../utils/crudrepo";


export type Topic = {
    id: number,
    subject_id: number,

    title: string,
    description: string,

    created_at: string,
    updated_at: string
};


export default new CrudRepo<Topic>("topics");

