import CrudRepo from "../../../utils/crudrepo";

export type SubjectTopic = {
    id: number;
    title: string;
    description?: string;
    teacher_subject_id: number,
    created_at: string;
    updated_at: string;
};


export default new CrudRepo<SubjectTopic>("subject_topics");