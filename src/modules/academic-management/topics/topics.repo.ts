import CrudRepo from "../../../utils/crudrepo";



export type Topic = {
    id: number;
    title: string;
    description?: string;
    subject_id: number,
    created_at: string;
    updated_at: string;
};


export default new CrudRepo<Topic>("topics");