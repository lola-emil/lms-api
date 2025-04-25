import CrudRepo from "../../../utils/crudrepo";

export interface Choice {
    id: number; // Primary key, Auto Increment
    choice_text: string; // Text for the choice content
    is_correct: boolean; // Boolean indicating if the choice is correct
    question_id: number; // Foreign key referencing the question it belongs to
}

export default new CrudRepo<Choice>("choices");