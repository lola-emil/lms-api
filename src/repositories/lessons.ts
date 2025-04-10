import CrudRepo from "../utils/crudrepo";



export type Lesson = {
    id: number,
    title: string,
    description?: string,
    topic_id: number,

    created_at: string,
    updated_at: string
};

export default new CrudRepo<Lesson>("lessons");
