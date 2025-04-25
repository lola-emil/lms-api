import CrudRepo from "../../../utils/crudrepo";

export interface Classwork {
    id: number;
    title: string;
    instruction: string;
    teacher_subject_id: number;

    due_date: string;

    hps: number;
  

    created_at: string; // or Date if you're parsing it
    updated_at: string; // or Date
}

export default new CrudRepo<Classwork>("classworks");