import CrudRepo from "../../../utils/crudrepo";

export interface Question {
    id: number; // Primary key, Auto Increment
    question_text: string; // Text field for the question content
    subject_item_id: number; // Foreign key to the subject_items table
    question_type: 'multiple-choice' | 'true-or-false' | 'fill-in-blank'; // Enum for question type
    created_at: string; // ISO string format for the date and time
    updated_at: string; // ISO string format for the date and time (updated on change)
  }

  export default new CrudRepo<Question>("questions");