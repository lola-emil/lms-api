import CrudRepo from "../../../utils/crudrepo";


export type SubjectMaterial = {
    id: number;
    title: string;

    teacher_subject_id: number;
    subject_topic_id: number;

    file_url?: string;

    material_type: "lesson" | "quiz" | "video-quiz";

    material_order: number;

    created_at: string;
    updated_at: string;
};

export default new CrudRepo<SubjectMaterial>("subject_materials");